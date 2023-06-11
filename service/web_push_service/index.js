const WebPush = require('web-push')

const Koa = require('koa')
const KoaRouter = require('koa-router')
const {koaBody} = require('koa-body')

const app = new Koa()
const router = new KoaRouter()

router.post('/sendNotice', async function (ctx) {
    const publicKey = ctx.request.body.publicKey
    const privateKey = ctx.request.body.privateKey
    const subject = ctx.request.body.subject
    const endpoint = ctx.request.body.endpoint
    const auth = ctx.request.body.auth
    const p256dh = ctx.request.body.p256dh
    const data = ctx.request.body.data
    const event = ctx.request.body.event
    console.log(JSON.stringify({
        publicKey,
        privateKey,
        subject,
        endpoint,
        auth,
        p256dh,
        data,
        event
    }))
    WebPush.sendNotification(
        {
            endpoint,
            keys: {
                auth,
                p256dh
            }
        },
        JSON.stringify({
            data,
            event
        }),
        {
            vapidDetails: {
                subject,
                publicKey,
                privateKey
            }
        }
    ).then(e => {
        console.log(e)
    }).catch(e => {
        throw e
    })

    ctx.body = {
        code: 200
    }
})

app.use(koaBody())
app.use(router.routes())
app.listen(8082)
