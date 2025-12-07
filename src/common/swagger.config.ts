import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function SwaggerConfig(app: INestApplication<any>) {
    const config = new DocumentBuilder()
        .setTitle('User Management')
        .setDescription('API documentation for User Management service')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT', // This is the name of the security scheme
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document);
}
