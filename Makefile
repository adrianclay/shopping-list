.PHONY: start
start:
	firebase emulators:exec --only firestore "yarn start"

.PHONY: verify-typescript
verify-typescript:
	yarn run tsc --noEmit
