import { environment } from "src/environments/environment";

export const ApiConstant = {
    // apiUrl: `${environment.baseUrl}`,
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