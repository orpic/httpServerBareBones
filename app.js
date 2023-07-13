// http
// https
// fs
// path
// os
import { createServer } from "http"
import { writeFileSync } from "fs"

const server = createServer((req, res) => {
    const url = req.url
    const method = req.method
    if (url === "/") {
        res.write('<html>')
        res.write('<head><title>Send Message</title></head>')
        res.write('<body><h1><form action="/message" method="POST"> <input type="text" name="message" /><button type="submit">Send to server</button></form></h1></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === "/message" && method === "POST") {
        const body = []
        req.on('data', (chunk) => {
            console.log("chunk: ", chunk)
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedbody = Buffer.concat(body).toString()
            // console.log(parsedbody)
            const message = parsedbody.split('=')[1];
            writeFileSync('message.txt', message);
            res.statusCode = 302
            res.setHeader("Location", "/")
            return res.end()
        })
    }
    // console.log(req)
    // process.exit()
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>response</title></head>')
    res.write('<body><h1>Hello from server</h1></body>')
    res.write('</html>')
    res.end()
})


server.listen(3000)