name := """play-java-seed"""
organization := "com.locusnine"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.13.1"

libraryDependencies ++= Seq(
 javaJdbc,
  ehcache,
  javaWs,
  guice,
  "mysql" % "mysql-connector-java" % "8.0.12",
  "org.springframework" % "spring-jdbc" % "5.0.8.RELEASE",
  "org.json" % "json" % "20180813",
  "com.microsoft.sqlserver" % "mssql-jdbc" % "7.0.0.jre8",
  "commons-io" % "commons-io" % "2.6",
  "xerces" % "xercesImpl" % "2.12.0"
)