# apri

Make opening files configurable.

# setup

```sh
yarn clean && yarn dist
```

# install

install Apri.app to user's `~/Applications` directory.
`unpublishLocal` will use `trash` command for safety.
Which you may not have this command, it's available on `brew`

```sh
brew install trash
```

```sh
yarn publishLocal
yarn unpublishLocal
```
