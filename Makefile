DIGDAG_CACHE = ./.digdag/

clean:
	rm -rf $(DIGDAG_CACHE)
	@echo "'$(DIGDAG_CACHE)' deleted."

configure-osx:
	bash ./install/osx.sh