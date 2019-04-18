import Dynamic from 'next/dynamic';
import { default as SwaggerUIComponent } from './SwaggerUI';
import LoadingSpinner from './LoadingSpinner';

export const SwaggerUI = Dynamic(
  import('./SwaggerUI') as never,
  {
    ssr: false,
    loading: () => <LoadingSpinner isFullScreen={true}/>
  }
) as never as typeof SwaggerUIComponent
