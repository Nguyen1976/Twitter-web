import axios from 'axios'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

let axiosReduxStore: { getState: () => any; dispatch: (action: any) => any }
export const injectStore = (mainStore: { getState: () => any; dispatch: (action: any) => any }) => {
  axiosReduxStore = mainStore
}

let authorizeAxiosInstance = axios.create({
  withCredentials: true,
  timeout: 1000 * 60 * 10
})

authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//Xử lý refresh Token
let refreshTokenPromise: any = null

authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    //TH1: Nếu nhận mã 403 từ be thì call api đăng xuất
    if (error.response?.status === 403) {
      axiosReduxStore.dispatch(logoutUserAPI())
      //call logout
    }

    //TH2: Nhận mã 401 từ BE
    const originalRequests = error.config
    if (error.response?.status === 401 && !originalRequests._retry) {
      originalRequests._retry = true //đảm bảo refresh được gọi 1 lần

      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            //Đồng thời accessToken đã nằm trong httpOnly cookie (xử lý từ phía BE)
            return data?.accessToken
          })
          .catch((_error) => {
            //Nếu nhận bất kì lỗi nào khi refreshToken thì logout luôn

            axiosReduxStore.dispatch(logoutUserAPI())
            return Promise.reject(_error) //Dòng này để tránh việc bị gọi API logout 2 lần nếu như rơi vào trường hợp khi API refreshToken trả về lỗi
          })
          .finally(() => {
            //Dù API có ok hay lỗi thì vẫn luôn gán lại cái refreshTokenPromise về null như cái ban đầu
            refreshTokenPromise = null
          })
      }
    }
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
