# Contributing to Pandemic

We welcome contributions to the Pandemic project! This document outlines the guidelines and processes for contributing to the project.

## Getting Started

1. **Fork the Repository**: Create a fork of the Pandemic repository on GitHub.
2. **Clone the Repository**: Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/your-username/Pandemic.git
   ```
3. **Install Dependencies**: Install all required dependencies:
   ```bash
   npm install
   pip install -r ai-service/requirements.txt
   ```
4. **Build the Project**: Build the Docker images:
   ```bash
   docker-compose build
   ```

## Coding Standards

- **JavaScript/TypeScript**:
  - Use 2 spaces for indentation
  - Follow the project's ESLint configuration
  - Use TypeScript for new components

- **Python**:
  - Use 4 spaces for indentation
  - Follow PEP 8 guidelines
  - Include type hints

- **General**:
  - Write clean, readable code
  - Include comments for complex logic
  - Follow existing code style

## Branch Strategy

1. **Main Branch**: The main branch is used for production-ready code.
2. **Feature Branches**: Create feature branches for new features:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Bug Fix Branches**: Create bug fix branches for fixes:
   ```bash
   git checkout -b fix/your-fix-name
   ```

## Pull Request Process

1. **Create a Pull Request**:
   - Push your feature branch to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```
   - Create a Pull Request against the main repository's main branch.

2. **Review Process**:
   - The PR will be reviewed by the maintainers
   - Address any feedback or issues
   - Once approved, the PR will be merged

3. **After Merge**:
   - Delete your feature branch
   - Update your local main branch:
     ```bash
     git pull origin main
     ```

## Code of Conduct

- Be respectful and professional in all communications
- Follow open source best practices
- Report any security issues responsibly

## License

[Insert License Information]

## Contact

- **Maintainers**: [List Maintainer Names/Emails]
- **Slack Channel**: [Slack Channel Link]
- **Email**: [Contact Email]
