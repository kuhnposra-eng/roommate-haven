# Deploy to AWS Elastic Beanstalk

This project is packaged as a small Node.js app for Elastic Beanstalk. It serves `index.html` through `server.js` and starts with `npm start`.

## 1. Prerequisites

- AWS account
- AWS CLI configured with credentials
- EB CLI installed
- Node.js available locally for testing

## 2. Test locally

```bash
npm start
```

Open:

```text
http://localhost:8080
```

## 3. Initialize Elastic Beanstalk

```bash
eb init roommate-haven --platform node.js --region ap-southeast-2
```

Recommended region for Sydney/Australia projects:

```text
ap-southeast-2
```

## 4. Create an environment

```bash
eb create roommate-haven-dev --single
```

This creates a simple single-instance environment.

## 5. Deploy updates

```bash
eb deploy
```

## 6. Open the deployed site

```bash
eb open
```

## 7. Shut down when finished

Elastic Beanstalk can create billable AWS resources. When you no longer need the demo:

```bash
eb terminate roommate-haven-dev
```
