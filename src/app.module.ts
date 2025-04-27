import { Module } from '@nestjs/common'
import { McpModule, McpTransportType } from '@rekog/mcp-nest'
import { GreetingTool } from './greeting.tool'

@Module({
  imports: [
    McpModule.forRoot({
      name: 'naver-mcp-server',
      version: '0.0.1',
      transport: McpTransportType.STDIO,
    }),
  ],
  providers: [GreetingTool],
})
export class AppModule {}
