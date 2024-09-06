java:
	sudo apt update
	sudo apt install openjdk-21-jdk -y
	sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-21-openjdk-amd64/bin/java 1
	sudo update-alternatives --config java
	java -version

download:
	mkdir minecraft_server.1.21
	cd minecraft_server.1.21
	# wget https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar -O minecraft_server.1.21.jar
	echo "eula=true" > eula.txt
	java -Xms1024M -Xmx4096M -jar minecraft_server.1.21.jar nogui

docker:
	docker-compose up --build backend