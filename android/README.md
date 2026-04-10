# Ambivert’s Diary (Android Project)

This directory contains the native Android application source code for Ambivert’s Diary, implemented in Java.

## Project Structure
- `app/src/main/java/com/example/blogapp/`: Core application logic (Activities, Adapters, Models).
- `app/src/main/res/layout/`: XML-based UI definitions.
- `app/build.gradle`: Build configuration and dependency management.

## Setup Instructions
1. **Import**: Open this folder as a new project in Android Studio.
2. **Firebase Configuration**:
   - Register the app in your Firebase Console.
   - Place the `google-services.json` file in the `app/` directory.
3. **Enable Services**: Ensure Authentication, Firestore, and Storage are enabled in your Firebase project.
4. **Run**: Sync the project with Gradle files and deploy to an emulator or physical device.
