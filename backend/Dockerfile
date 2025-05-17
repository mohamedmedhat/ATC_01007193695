FROM maven:3.8.4-openjdk-17-alpine AS build

WORKDIR /app
COPY pom.xml .
COPY src /app/src

RUN mvn clean package -DskipTests --no-transfer-progress

FROM openjdk:17-jre-alpine

WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
