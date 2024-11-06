declare namespace UrlFetch {
    interface Request { }

    interface Response { }

    interface Stream {
        getRawRequest(): GoogleAppsScript.URL_Fetch.URLFetchRequest;
        setRawResponse(response: GoogleAppsScript.URL_Fetch.HTTPResponse): void;
        readonly hasError: boolean;
        readonly error: string;
    }

    interface ConcreteStream<TRequest extends Request, TResponse extends Response> extends Stream {
        readonly request: TRequest;
        readonly response: TResponse;
    }
}
