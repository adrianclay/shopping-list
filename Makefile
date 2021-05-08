.PHONY: start
start:
	firebase emulators:exec --only firestore,auth "yarn start"

.PHONY: verify-typescript
verify-typescript:
	yarn run tsc --noEmit
