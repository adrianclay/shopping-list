.PHONY: start
start:
	firebase emulators:exec --only firestore,auth "yarn start"

.PHONY: test
test:
	firebase emulators:exec --only firestore,auth "yarn test"

.PHONY: verify-typescript
verify-typescript:
	yarn run tsc --noEmit
