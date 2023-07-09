// http
// https
// fs
// path
// os
import { createServer } from "http"

const server = createServer((res, req) => {
    console.log(req)
    // process.exit()
})


server.listen(3000)