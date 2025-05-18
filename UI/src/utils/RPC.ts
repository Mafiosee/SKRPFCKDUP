import { callClient } from './api'

export class RPC {
  private static pendingRequests: Map<
    string,
    {
      resolve: (data: any) => void
      reject: (error: Error) => void
      timestamp: number
    }
  > = new Map()

  private static TIMEOUT = 5000

  public static callClient(
    customPacketType: string,
    data: any = null,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestId = crypto.randomUUID()
      const message = { requestId, customPacketType, data }

      this.pendingRequests.set(requestId, {
        resolve,
        reject,
        timestamp: Date.now(),
      })

      this.sendRPCPacket('RPC-call-client', message)
    })
  }

  public static callServer(
    customPacketType: string,
    data: any = null,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestId = crypto.randomUUID()
      const message = { requestId, customPacketType, data }

      this.pendingRequests.set(requestId, {
        resolve,
        reject,
        timestamp: Date.now(),
      })

      this.sendRPCPacket('RPC-call-server', message)
    })
  }

  public static handleMessage(content: any = null) {
    if (content.requestId && this.pendingRequests.has(content.requestId)) {
      const { resolve } = this.pendingRequests.get(content.requestId)!

      resolve(content?.data)

      this.pendingRequests.delete(content.requestId)
    }
  }

  public static checkPendingRequests() {
    const now = Date.now()

    for (const [requestId, { reject, timestamp }] of this.pendingRequests) {
      if (now - timestamp >= this.TIMEOUT) {
        reject(new Error(`RPC call timed out for requestId: ${requestId}`))
        this.pendingRequests.delete(requestId)
      }
    }
  }

  private static sendRPCPacket(type: string, data: any) {
    callClient(type, data)
  }
}
