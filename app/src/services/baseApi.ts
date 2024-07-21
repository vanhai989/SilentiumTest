class FetchWrapper {
  private abortController: AbortController;

  constructor() {
    this.abortController = new AbortController();
  }

  get signal() {
    return this.abortController.signal;
  }

  async fetch<T>(url: string): Promise<T> {
    console.log(`url: ${url}`); 
    const response = await fetch(url, { signal: this.signal });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: T = await response.json();
    return data;
  }

  abort() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}

const fetchWrapper = new FetchWrapper();
export default fetchWrapper;
