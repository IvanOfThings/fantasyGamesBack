ARG BASE_IMAGE=node:12.2-alpine

FROM ${BASE_IMAGE} AS builder

ENV BUILDDIR=/usr/src/app

# Create app directory
WORKDIR $BUILDDIR

# First we copy the package file since the dependencies don't change that often.
COPY ./package.json $BUILDDIR
COPY ./yarn.lock $BUILDDIR
#
RUN yarn install

# we build to ./dist folder
ENV NODE_ENV=production
COPY . $BUILDDIR
RUN yarn build

#
# multistage-build; alpine for lightweight final image
#
FROM ${BASE_IMAGE} as app
ENV APPDIR=/usr/src/app
ENV NODE_ENV=production

# Add user to run the application
RUN addgroup -S appUser
RUN adduser -S appUser -G appUser

# Create app directory
WORKDIR $APPDIR
RUN mkdir dist
WORKDIR $APPDIR/dist
RUN mkdir logs

COPY --from=builder --chown=appUser:appUser /usr/src/app/dist/ .
COPY --from=builder --chown=appUser:appUser /usr/src/app/dist/package.json .
COPY --from=builder --chown=appUser:appUser /usr/src/app/dist/yarn.lock .

RUN yarn install --production


USER appUser

EXPOSE 3010

CMD ["node", "index.js" ]