### Gym Management System

This code implements a gym management system using TypeScript with the Azle framework. It provides functionalities to manage members, gym classes, and trainers.

#### Modules Used:
- **Azle**: A framework for building decentralized applications (dApps) on the Internet Computer.
- **UUID**: A library for generating universally unique identifiers (UUIDs).

#### Data Types:
1. **Member**: Represents a gym member with the following attributes:
   - `id`: Unique identifier for the member.
   - `name`: Name of the member.
   - `email`: Email address of the member.
   - `joinDate`: Date when the member joined the gym.
   - `membershipType`: Type of membership.
   - `createdAt`: Timestamp indicating when the member record was created.
   - `updatedAt`: Optional timestamp indicating when the member record was last updated.

2. **MemberPayload**: Represents the payload used to add or update member information.

3. **GymClass**: Represents a gym class with the following attributes:
   - `id`: Unique identifier for the gym class.
   - `name`: Name of the gym class.
   - `description`: Description of the gym class.
   - `startTime`: Start time of the gym class.
   - `endTime`: End time of the gym class.
   - `trainerId`: ID of the trainer conducting the class.
   - `capacity`: Maximum capacity of the gym class.
   - `createdAt`: Timestamp indicating when the gym class record was created.
   - `updatedAt`: Optional timestamp indicating when the gym class record was last updated.

4. **GymClassPayload**: Represents the payload used to add or update gym class information.

5. **Trainer**: Represents a gym trainer with the following attributes:
   - `id`: Unique identifier for the trainer.
   - `name`: Name of the trainer.
   - `email`: Email address of the trainer.
   - `specializations`: List of specializations or expertise areas of the trainer.
   - `createdAt`: Timestamp indicating when the trainer record was created.
   - `updatedAt`: Optional timestamp indicating when the trainer record was last updated.

6. **TrainerPayload**: Represents the payload used to add or update trainer information.

#### Functions:
1. **Member Management Functions**:
   - `getMembers()`: Retrieve a list of all gym members.
   - `getMember(id)`: Retrieve a gym member by ID.
   - `addMember(payload)`: Add a new gym member.
   - `updateMember(id, payload)`: Update an existing gym member's information.
   - `deleteMember(id)`: Delete a gym member by ID.
   - `updateMembershipType(id, membershipType)`: Update a gym member's membership type by ID.
   - `updateMemberEmail(id, email)`: Update a gym member's email by ID.
   - `updateMemberName(id, name)`: Update a gym member's name by ID.
   - `searchMembers(query)`: Search for gym members by name or email.

2. **Gym Class Management Functions**:
   - `addGymClass(payload)`: Add a new gym class.
   - `getGymClasses()`: Retrieve a list of all gym classes.
   - `getGymClass(id)`: Retrieve a gym class by ID.
   - `updateGymClass(id, payload)`: Update an existing gym class.
   - `deleteGymClass(id)`: Delete a gym class by ID.
   - `filterGymClassesByStartTime(startTime)`: Filter gym classes by start time.

3. **Trainer Management Functions**:
   - `addTrainer(payload)`: Add a new gym trainer.
   - `getTrainers()`: Retrieve a list of all gym trainers.
   - `getTrainer(id)`: Retrieve a gym trainer by ID.
   - `updateTrainer(id, payload)`: Update an existing gym trainer's information.
   - `deleteTrainer(id)`: Delete a gym trainer by ID.
   - `checkTrainerAvailability(trainerId, startTime, endTime)`: Check the availability of a trainer during a specified time frame.

#### Global Configuration:
- A workaround is provided to make the UUID package compatible with the Azle framework.

---

#### Deployment

1. **Installation**

    Ensure you have Node.js and npm installed. Run the following command to install dependencies:

    ```bash
    npm install
    ```

2. Start the IC local development environment

    ```bash
    dfx start --background --clean
    ```

3. Deploy the canisters to the local development environment

    ```bash
    dfx deploy
    ```