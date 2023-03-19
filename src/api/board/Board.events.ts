export interface TaskUpdatedEvent {
    taskId: string
    columnId: string
    ownerId: string
    text: string
}

export interface TaskDeletedEvent {
    taskId: string
}