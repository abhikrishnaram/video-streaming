
# Video Streaming

A simple Video Streaming implementation

- NodeJS
- ExpressJS
- REST API





## Run Locally

Clone the project

```bash
  git clone https://github.com/abhikrishnaram/video-streaming/
```

Go to the project directory

```bash
  cd video-streaming
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Appendix

Algorithmic Flow of The Application

- A video streaming request will be routed to our server from a client computing device.
    
- When a request is made, the server receives the file size and sends the starting chunk of the requested video.
    
- We mathematically calculate the above components, i.e., file size, chunk size, next buffering point size, etc.
    
- While streaming, consecutive requests are made to stream the complete video, i.e., chunk by chunk after the initial one.
    
- The HTTP 206 header is set in response. It will send and flag only partial content while streaming, signaling synchronous wait for the next chunks to be streamed in continuation.

