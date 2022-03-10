.PHONY: build-CatalogBatchSave

build-CatalogBatchSave:
	yarn compile
	cp -r ./src $(ARTIFACTS_DIR)
	cp package.json $(ARTIFACTS_DIR)
	cd $(ARTIFACTS_DIR); yarn install --production=true