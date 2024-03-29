// Import necessary modules
import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define types for Member and MemberPayload
type Member = Record<{
    id: string;
    name: string;
    email: string;
    joinDate: string;
    membershipType: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type MemberPayload = Record<{
    name: string;
    email: string;
    joinDate: string;
    membershipType: string;
}>

// Define types for GymClass and Trainer
type GymClass = Record<{
    id: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    trainerId: string;
    capacity: number;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type Trainer = Record<{
    id: string;
    name: string;
    email: string;
    specializations: Vec<string>;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type GymClassPayload = Record<{
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    trainerId: string;
    capacity: number;
}>

type TrainerPayload = Record<{
    name: string;
    email: string;
    specializations: Vec<string>;
}>

// Create maps to store gym class, trainer, and member records
const memberStorage = new StableBTreeMap<string, Member>(0, 44, 1024);
const classStorage = new StableBTreeMap<string, GymClass>(1, 44, 1024);
const trainerStorage = new StableBTreeMap<string, Trainer>(2, 44, 1024);
$query;
export function getMembers(): Result<Vec<Member>, string> {
    return Result.Ok(memberStorage.values());
}

$query;
export function getMember(id: string): Result<Member, string> {
    return match(memberStorage.get(id), {
        Some: (member) => Result.Ok<Member, string>(member),
        None: () => Result.Err<Member, string>(`Member with id=${id} not found`)
    });
}

$update;
export function addMember(payload: MemberPayload): Result<Member, string> {
    // Input validation
    if (!payload || !payload.name || !payload.email || !payload.joinDate || !payload.membershipType) {
        return Result.Err("Invalid member payload. All fields are required.");
    }

    const member: Member = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    memberStorage.insert(member.id, member);
    return Result.Ok(member);
}

$update;
export function updateMember(id: string, payload: MemberPayload): Result<Member, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid member ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(memberStorage.get(id), {
        Some: (member) => {
            const updatedMember: Member = {...member, ...payload, updatedAt: Opt.Some(ic.time())};
            memberStorage.insert(member.id, updatedMember);
            return Result.Ok<Member, string>(updatedMember);
        },
        None: () => Result.Err<Member, string>(`Couldn't update a member with id=${id}. Member not found`)
    });
}

$update;
export function deleteMember(id: string): Result<Member, string> {
    return match(memberStorage.remove(id), {
        Some: (deletedMember) => Result.Ok<Member, string>(deletedMember),
        None: () => Result.Err<Member, string>(`Couldn't delete a member with id=${id}. Member not found.`)
    });
}

// Update member's membership type by ID
$update;
export function updateMembershipType(id: string, membershipType: string): Result<Member, string> {
    return match(memberStorage.get(id), {
        Some: (member) => {
            const updatedMember: Member = { ...member, membershipType, updatedAt: Opt.Some(ic.time()) };
            memberStorage.insert(member.id, updatedMember);
            return Result.Ok<Member, string>(updatedMember);
        },
        None: () => Result.Err<Member, string>(`Couldn't update the membership type for member with id=${id}. Member not found`)
    });
}

// Update member's email by ID
$update;
export function updateMemberEmail(id: string, email: string): Result<Member, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid member ID.");
    }
    if (!email) {
        return Result.Err("Invalid email. Email field is required.");
    }

    return match(memberStorage.get(id), {
        Some: (member) => {
            const updatedMember: Member = { ...member, email, updatedAt: Opt.Some(ic.time()) };
            memberStorage.insert(member.id, updatedMember);
            return Result.Ok<Member, string>(updatedMember);
        },
        None: () => Result.Err<Member, string>(`Couldn't update the email for member with id=${id}. Member not found`)
    });
}

$update;
export function updateMemberName(id: string, name: string): Result<Member, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid member ID.");
    }
    if (!name) {
        return Result.Err("Invalid name. Name field is required.");
    }

    return match(memberStorage.get(id), {
        Some: (member) => {
            const updatedMember: Member = { ...member, name, updatedAt: Opt.Some(ic.time()) };
            memberStorage.insert(member.id, updatedMember);
            return Result.Ok<Member, string>(updatedMember);
        },
        None: () => Result.Err<Member, string>(`Couldn't update the name for member with id=${id}. Member not found`)
    });
}

// Functions for Gym Classes
$update;
export function addGymClass(payload: GymClassPayload): Result<GymClass, string> {
    // Input validation
    if (!payload || !payload.name || !payload.startTime || !payload.endTime || !payload.trainerId || !payload.capacity) {
        return Result.Err("Invalid gym class payload. All fields are required.");
    }

    const gymClass: GymClass = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    classStorage.insert(gymClass.id, gymClass);
    return Result.Ok(gymClass);
}

$query;
export function getGymClasses(): Result<Vec<GymClass>, string> {
    return Result.Ok(classStorage.values());
}

$query;
export function getGymClass(id: string): Result<GymClass, string> {
    return match(classStorage.get(id), {
        Some: (gymClass) => Result.Ok<GymClass, string>(gymClass),
        None: () => Result.Err<GymClass, string>(`Gym class with id=${id} not found`)
    });
}

$update;
export function updateGymClass(id: string, payload: GymClassPayload): Result<GymClass, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid gym class ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(classStorage.get(id), {
        Some: (gymClass) => {
            const updatedGymClass: GymClass = {...gymClass, ...payload, updatedAt: Opt.Some(ic.time())};
            classStorage.insert(gymClass.id, updatedGymClass);
            return Result.Ok<GymClass, string>(updatedGymClass);
        },
        None: () => Result.Err<GymClass, string>(`Couldn't update a gym class with id=${id}. Gym class not found`)
    });
}

$update;
export function deleteGymClass(id: string): Result<GymClass, string> {
    return match(classStorage.remove(id), {
        Some: (deletedGymClass) => Result.Ok<GymClass, string>(deletedGymClass),
        None: () => Result.Err<GymClass, string>(`Couldn't delete a gym class with id=${id}. Gym class not found.`)
    });
}

// Functions for Trainers
$update;
export function addTrainer(payload: TrainerPayload): Result<Trainer, string> {
    // Input validation
    if (!payload || !payload.name || !payload.email || !payload.specializations || payload.specializations.length === 0) {
        return Result.Err("Invalid trainer payload. Name, email, and at least one specialization are required.");
    }

    const trainer: Trainer = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    trainerStorage.insert(trainer.id, trainer);
    return Result.Ok(trainer);
}

$query;
export function getTrainers(): Result<Vec<Trainer>, string> {
    return Result.Ok(trainerStorage.values());
}

$query;
export function getTrainer(id: string): Result<Trainer, string> {
    return match(trainerStorage.get(id), {
        Some: (trainer) => Result.Ok<Trainer, string>(trainer),
        None: () => Result.Err<Trainer, string>(`Trainer with id=${id} not found`)
    });
}

$update;
export function updateTrainer(id: string, payload: TrainerPayload): Result<Trainer, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid trainer ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(trainerStorage.get(id), {
        Some: (trainer) => {
            const updatedTrainer: Trainer = {...trainer, ...payload, updatedAt: Opt.Some(ic.time())};
            trainerStorage.insert(trainer.id, updatedTrainer);
            return Result.Ok<Trainer, string>(updatedTrainer);
        },
        None: () => Result.Err<Trainer, string>(`Couldn't update a trainer with id=${id}. Trainer not found`)
    });
}

$update;
export function deleteTrainer(id: string): Result<Trainer, string> {
    return match(trainerStorage.remove(id), {
        Some: (deletedTrainer) => Result.Ok<Trainer, string>(deletedTrainer),
        None: () => Result.Err<Trainer, string>(`Couldn't delete a trainer with id=${id}. Trainer not found.`)
    });
}

$query;
export function searchMembers(query: string): Result<Vec<Member>, string> {
    // Input validation
    if (!query || query.trim() === "") {
        return Result.Err("Invalid search query. Query must not be empty.");
    }

    const filteredMembers = memberStorage.values().filter(member =>
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.email.toLowerCase().includes(query.toLowerCase())
    );
    return Result.Ok(filteredMembers);
}

$query;
export function filterGymClassesByStartTime(startTime: string): Result<Vec<GymClass>, string> {
    // Input validation
    if (!startTime) {
        return Result.Err("Invalid start time. Start time is required.");
    }

    const filteredClasses = classStorage.values().filter(gymClass =>
        gymClass.startTime === startTime
    );
    return Result.Ok(filteredClasses);
}

$query;
export function checkTrainerAvailability(trainerId: string, startTime: string, endTime: string): Result<boolean, string> {
    // Input validation
    if (!trainerId) {
        return Result.Err("Invalid trainer ID.");
    }
    if (!startTime || !endTime) {
        return Result.Err("Invalid start time or end time.");
    }

    const trainer = trainerStorage.get(trainerId);
    if (trainer) {
        // Logic to check if trainer is available during the specified time frame
        // Example: Check if trainer has any classes scheduled during the specified time
        const conflictingClasses = classStorage.values().filter(gymClass =>
            gymClass.trainerId === trainerId &&
            ((gymClass.startTime >= startTime && gymClass.startTime <= endTime) ||
            (gymClass.endTime >= startTime && gymClass.endTime <= endTime))
        );
        return Result.Ok(conflictingClasses.length === 0);
    } else {
        return Result.Err(`Trainer with id=${trainerId} not found`);
    }
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
   getRandomValues: () => {
       let array = new Uint8Array(32);

       for (let i = 0; i < array.length; i++) {
           array[i] = Math.floor(Math.random() * 256);
       }

       return array;
   }
};