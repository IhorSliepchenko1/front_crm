FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Копируем заранее собранные файлы (локальная папка build)
COPY ./build ./

# Настраиваем Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
