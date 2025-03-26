import {apiService} from './Api';
import { GetRestaurantDetailResponse } from './Interface/GetRestaurantDetailResponse';
import {Response} from './Response';
import {API_ENDPOINTS} from './constant/ApiConstant';

//  for fetch the restaurent details 

export async function GET_RESTAURENT_DETAIL(
  userData: any,
): Promise<Response<GetRestaurantDetailResponse>> {
  const requestData = {
    page_no: userData.page_no
  };
  try {
    console.log(requestData, "requestDatarequestData")
    const response = await apiService.post<GetRestaurantDetailResponse>(
      API_ENDPOINTS.GET_RESTAURENT_DETAIL,
      requestData,
    );
    return response;
  } catch (error) {
    return {
      isSuccessful: false,
      errorBody: {statusCode: 500, message: 'Internal Server Error'},
    };
  }
}

