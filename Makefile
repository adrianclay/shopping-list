.PHONY: start

start:
	firebase emulators:exec --only firestore "yarn start"
