class UrlFetchManager {
    public static execute(streams: UrlFetch.Stream | UrlFetch.Stream[]): UrlFetchResult {
        if (!Array.isArray(streams)) {
            streams = [streams];
        }
        const length = streams.length;
        const requests: GoogleAppsScript.URL_Fetch.URLFetchRequest[] = [];
        for (let i = 0; i < length; i++) {
            requests.push(streams[i].getRawRequest());
        }
        let responses: GoogleAppsScript.URL_Fetch.HTTPResponse[] = [];
        try {
            responses = UrlFetchApp.fetchAll(requests);
        }
        catch (e) {
            return UrlFetchResult.createErrorResult(e);
        }
        const result = new UrlFetchResult();
        for (let i = 0; i < length; i++) {
            streams[i].setRawResponse(responses[i]);
            if (streams[i].hasError) {
                result.errors.push(streams[i].error);
            }
        }
        return result;
    }

    public static executeForEach(streams: UrlFetch.Stream | UrlFetch.Stream[]): UrlFetchResult {
        if (!Array.isArray(streams)) {
            streams = [streams];
        }
        const length = streams.length;
        const requests: GoogleAppsScript.URL_Fetch.URLFetchRequest[] = [];
        for (let i = 0; i < length; i++) {
            requests.push(streams[i].getRawRequest());
        }

        const responses: GoogleAppsScript.URL_Fetch.HTTPResponse[] = new Array(length);
        try {
            for (let i = 0; i < length; i++) {
                const req = requests[i];
                const res = UrlFetchApp.fetch(req.url, req);
                responses[i] = res;
            }
        }
        catch (e) {
            return UrlFetchResult.createErrorResult(e);
        }

        const result: UrlFetchResult = new UrlFetchResult();
        for (let i = 0; i < length; i++) {
            streams[i].setRawResponse(responses[i]);
            if (streams[i].hasError) {
                result.errors.push(streams[i].error);
            }
        }
        return result;
    }
}
