export interface RestaurantDetail {
    id: string;         
    name: string;
    image: string;        
    category: string;     
    veg: boolean;       
    nonVeg: boolean;   
    location: string;    
  }
  export interface GetRestaurantDetailResponse {
    data: RestaurantDetail[];
    message?: string;    
    statusCode?: number;  
  }
  