.PHONY: build-CatalogBatchSave

build-CatalogBatchSave:
	yarn install
	yarn compile
	cp -r ./compiled $(ARTIFACTS_DIR)
	cp package.json $(ARTIFACTS_DIR)
	cd $(ARTIFACTS_DIR); yarn install --production=true