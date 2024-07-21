export const delayedResponse = (response: string, delay: number) => {
    return new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve(new Response(response));
      }, delay);
    });
  };