FROM node:14 AS development
ENV PORT=3000
ENV HOST=0.0.0.0
WORKDIR /app
ENV REACT_APP_PROXY=http://dwellinglybackend:5000

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --save-dev
EXPOSE 3000
EXPOSE 5000

CMD [ "npm", "start", "--host", "0.0.0.0" ]
