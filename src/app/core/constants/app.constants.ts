export const ApiConstant = {
   locationUrl: 'http://api.openweathermap.org/geo/1.0/direct',
   apiUrl: 'https://api.openweathermap.org/data/2.5/onecall',
   apiKey: 'e7cc0d8d56204069f0c3a7195e7917b9',
}
interface ApplicationPathsType {
    readonly Home: string;
    readonly HomePathComponents: string[];
    readonly Detail: string;
    readonly DetailPathComponents: string[];
  }
  let applicationPaths: ApplicationPathsType = {
    Home: '',
    HomePathComponents: [],
    Detail: 'detail',
    DetailPathComponents: [],
  };
  applicationPaths = {
    ...applicationPaths,
    HomePathComponents: applicationPaths.Home.split('/'),
    DetailPathComponents: applicationPaths.Detail.split('/'),
  };
  
  export const ApplicationPaths: ApplicationPathsType = applicationPaths;