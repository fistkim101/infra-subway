FROM openjdk:11-jre-slim
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} subway.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=production", "/subway.jar"]