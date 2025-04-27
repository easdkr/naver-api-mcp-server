import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  })
  return app.close()
  // await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
