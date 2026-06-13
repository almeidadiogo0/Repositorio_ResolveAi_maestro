# Maestro tests

These flows target the native app id configured in `app.json`:

```text
com.resolveai
```

## Prerequisites

- Install Java 17+ and make sure `java -version` works.
- Install Maestro CLI and make sure `maestro --version` works. On Windows, the official options are the GitHub `maestro.zip` release or the installer script.
- Install Android platform tools and make sure `adb devices` lists an emulator or device. If `adb` is not recognized, add `%LOCALAPPDATA%\Android\Sdk\platform-tools` to your user `PATH`.
- Build/install the app on that device, for example with `npm run android`.

The authenticated flows also need Metro, the backend running at the API URL configured in `src/api/client.ts`, and the test account:

```text
email: teste@teste.com
password: teste123
```

## Commands

Run the unauthenticated smoke flows:

```bash
npm run maestro:smoke
```

Run every flow sequentially:

```bash
npm run maestro:test
```

Run only the authenticated occurrence creation flow:

```bash
maestro test .maestro/authenticated-create-occurrence.yaml
```

If the app is being tested through Expo Go instead of a native build, change `appId` in the flows to the Expo Go app id used by your device, such as `host.exp.exponent` on Android.
