.PHONY: start
start:
	firebase --project=dummy-project-id emulators:exec --only firestore,auth "yarn start"

.PHONY: test
test:
	firebase --project=dummy-project-id emulators:exec --only firestore,auth "yarn test"

.PHONY: verify-typescript
verify-typescript:
	yarn run tsc --noEmit
