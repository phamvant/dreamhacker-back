## Tech Stack 🍞
- **Backend**: Express.js (Node.js) 🎵
- **Frontend**: React.js 💻
- **Database**: PostgreSQL 🐘
- **Cloud Infrastructure**: AWS (Amazon Web Services) 🌏 [EC2, S3, ECR, RDS, Route53]
- **Containerization**: Docker (Node.js, Nginx)

## Project Description
Dreamhacker is dedicated to developing a leading international online and offline community to helping you achieve both personal and professional goals, and to cultivating long-term trusted relationship among members.

## Architecture
1. **Client-Side (Next.js)**
   - Basicly the UI 😁

2. **Server-Side (Express.js)**
   - Manages routing and API endpoints.
   - Processes client requests and interacts with the PostgreSQL database using `node-postgres`.

3. **Database (PostgreSQL)**
   - Deployed on AWS RDS
     
  ![Screenshot 2024-08-22 at 23 04 56](https://github.com/user-attachments/assets/058ff028-f792-4db3-a2d2-f7da7e385dfb)

5. **AWS Services**
   - **EC2**: Hosts the backend server, running the Express.js application. The application is containerized using Docker, with separate containers for the Node.js backend and Nginx as a reverse proxy.
   - **RDS**: Provides a managed PostgreSQL instance for secure and scalable database operations.
   - **S3**: Used for storing static files such as images, videos, and other assets of the post.
  
6. **Github Action**
   - Implementing CI/CD pipelines for Docker images and push onto ECR
