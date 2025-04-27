import { Injectable } from '@nestjs/common'
import { Context, Resource, Tool } from '@rekog/mcp-nest'
import { z } from 'zod'
import { Progress } from '@modelcontextprotocol/sdk/types'

@Injectable()
export class GreetingTool {
  @Tool({
    name: 'greeting',
    description:
      'Returns a greeting message and simulated a long operation with progress updates',
    parameters: z.object({
      name: z.string().describe('World!'),
    }),
  })
  async sayHello({ name }, context: Context) {
    const greeting = `Hello, ${name}!`

    const totalSteps = 5
    for (let i = 0; i < totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Send a progress update.
      await context.reportProgress({
        progress: (i + 1) * 20,
        total: 100,
      } as Progress)
    }

    return {
      content: [{ type: 'text', text: greeting }],
    }
  }

  @Resource({
    uri: 'mcp://hello-world/{userName}',
    name: 'Hello World',
    description: 'A simple hello world resource',
    mimeType: 'text/plain',
  })
  getCurrentSchema({ uri, userName }) {
    return {
      content: [
        {
          uri,
          text: `Hello ${userName}!`,
          mimeType: 'text/plain',
        },
      ],
    }
  }
}
