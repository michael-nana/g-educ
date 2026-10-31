import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EventModel = runtime.Types.Result.DefaultSelection<Prisma.$EventPayload>;
export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null;
    _min: EventMinAggregateOutputType | null;
    _max: EventMaxAggregateOutputType | null;
};
export type EventMinAggregateOutputType = {
    id: string | null;
    classId: string | null;
    type: $Enums.EventType | null;
    title: string | null;
    description: string | null;
    subjectId: string | null;
    startsAt: Date | null;
    endsAt: Date | null;
    status: $Enums.ContentStatus | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EventMaxAggregateOutputType = {
    id: string | null;
    classId: string | null;
    type: $Enums.EventType | null;
    title: string | null;
    description: string | null;
    subjectId: string | null;
    startsAt: Date | null;
    endsAt: Date | null;
    status: $Enums.ContentStatus | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EventCountAggregateOutputType = {
    id: number;
    classId: number;
    type: number;
    title: number;
    description: number;
    subjectId: number;
    startsAt: number;
    endsAt: number;
    status: number;
    createdById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EventMinAggregateInputType = {
    id?: true;
    classId?: true;
    type?: true;
    title?: true;
    description?: true;
    subjectId?: true;
    startsAt?: true;
    endsAt?: true;
    status?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EventMaxAggregateInputType = {
    id?: true;
    classId?: true;
    type?: true;
    title?: true;
    description?: true;
    subjectId?: true;
    startsAt?: true;
    endsAt?: true;
    status?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EventCountAggregateInputType = {
    id?: true;
    classId?: true;
    type?: true;
    title?: true;
    description?: true;
    subjectId?: true;
    startsAt?: true;
    endsAt?: true;
    status?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EventCountAggregateInputType;
    _min?: EventMinAggregateInputType;
    _max?: EventMaxAggregateInputType;
};
export type GetEventAggregateType<T extends EventAggregateArgs> = {
    [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEvent[P]> : Prisma.GetScalarType<T[P], AggregateEvent[P]>;
};
export type EventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithAggregationInput | Prisma.EventOrderByWithAggregationInput[];
    by: Prisma.EventScalarFieldEnum[] | Prisma.EventScalarFieldEnum;
    having?: Prisma.EventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EventCountAggregateInputType | true;
    _min?: EventMinAggregateInputType;
    _max?: EventMaxAggregateInputType;
};
export type EventGroupByOutputType = {
    id: string;
    classId: string;
    type: $Enums.EventType;
    title: string;
    description: string | null;
    subjectId: string | null;
    startsAt: Date;
    endsAt: Date | null;
    status: $Enums.ContentStatus;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
    _count: EventCountAggregateOutputType | null;
    _min: EventMinAggregateOutputType | null;
    _max: EventMaxAggregateOutputType | null;
};
export type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EventGroupByOutputType[P]>;
}>>;
export type EventWhereInput = {
    AND?: Prisma.EventWhereInput | Prisma.EventWhereInput[];
    OR?: Prisma.EventWhereInput[];
    NOT?: Prisma.EventWhereInput | Prisma.EventWhereInput[];
    id?: Prisma.UuidFilter<"Event"> | string;
    classId?: Prisma.UuidFilter<"Event"> | string;
    type?: Prisma.EnumEventTypeFilter<"Event"> | $Enums.EventType;
    title?: Prisma.StringFilter<"Event"> | string;
    description?: Prisma.StringNullableFilter<"Event"> | string | null;
    subjectId?: Prisma.UuidNullableFilter<"Event"> | string | null;
    startsAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Event"> | Date | string | null;
    status?: Prisma.EnumContentStatusFilter<"Event"> | $Enums.ContentStatus;
    createdById?: Prisma.UuidFilter<"Event"> | string;
    createdAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    subject?: Prisma.XOR<Prisma.SubjectNullableScalarRelationFilter, Prisma.SubjectWhereInput> | null;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reminders?: Prisma.EventReminderListRelationFilter;
};
export type EventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    subjectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    class?: Prisma.ClassOrderByWithRelationInput;
    subject?: Prisma.SubjectOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    reminders?: Prisma.EventReminderOrderByRelationAggregateInput;
};
export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EventWhereInput | Prisma.EventWhereInput[];
    OR?: Prisma.EventWhereInput[];
    NOT?: Prisma.EventWhereInput | Prisma.EventWhereInput[];
    classId?: Prisma.UuidFilter<"Event"> | string;
    type?: Prisma.EnumEventTypeFilter<"Event"> | $Enums.EventType;
    title?: Prisma.StringFilter<"Event"> | string;
    description?: Prisma.StringNullableFilter<"Event"> | string | null;
    subjectId?: Prisma.UuidNullableFilter<"Event"> | string | null;
    startsAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Event"> | Date | string | null;
    status?: Prisma.EnumContentStatusFilter<"Event"> | $Enums.ContentStatus;
    createdById?: Prisma.UuidFilter<"Event"> | string;
    createdAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    subject?: Prisma.XOR<Prisma.SubjectNullableScalarRelationFilter, Prisma.SubjectWhereInput> | null;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reminders?: Prisma.EventReminderListRelationFilter;
}, "id">;
export type EventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    subjectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EventCountOrderByAggregateInput;
    _max?: Prisma.EventMaxOrderByAggregateInput;
    _min?: Prisma.EventMinOrderByAggregateInput;
};
export type EventScalarWhereWithAggregatesInput = {
    AND?: Prisma.EventScalarWhereWithAggregatesInput | Prisma.EventScalarWhereWithAggregatesInput[];
    OR?: Prisma.EventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EventScalarWhereWithAggregatesInput | Prisma.EventScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Event"> | string;
    classId?: Prisma.UuidWithAggregatesFilter<"Event"> | string;
    type?: Prisma.EnumEventTypeWithAggregatesFilter<"Event"> | $Enums.EventType;
    title?: Prisma.StringWithAggregatesFilter<"Event"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Event"> | string | null;
    subjectId?: Prisma.UuidNullableWithAggregatesFilter<"Event"> | string | null;
    startsAt?: Prisma.DateTimeWithAggregatesFilter<"Event"> | Date | string;
    endsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null;
    status?: Prisma.EnumContentStatusWithAggregatesFilter<"Event"> | $Enums.ContentStatus;
    createdById?: Prisma.UuidWithAggregatesFilter<"Event"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Event"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Event"> | Date | string;
};
export type EventCreateInput = {
    id?: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutEventsInput;
    subject?: Prisma.SubjectCreateNestedOneWithoutEventsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutEventsCreatedInput;
    reminders?: Prisma.EventReminderCreateNestedManyWithoutEventInput;
};
export type EventUncheckedCreateInput = {
    id?: string;
    classId: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reminders?: Prisma.EventReminderUncheckedCreateNestedManyWithoutEventInput;
};
export type EventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutEventsNestedInput;
    subject?: Prisma.SubjectUpdateOneWithoutEventsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutEventsCreatedNestedInput;
    reminders?: Prisma.EventReminderUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reminders?: Prisma.EventReminderUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventCreateManyInput = {
    id?: string;
    classId: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventListRelationFilter = {
    every?: Prisma.EventWhereInput;
    some?: Prisma.EventWhereInput;
    none?: Prisma.EventWhereInput;
};
export type EventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EventScalarRelationFilter = {
    is?: Prisma.EventWhereInput;
    isNot?: Prisma.EventWhereInput;
};
export type EventCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutClassInput, Prisma.EventUncheckedCreateWithoutClassInput> | Prisma.EventCreateWithoutClassInput[] | Prisma.EventUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutClassInput | Prisma.EventCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.EventCreateManyClassInputEnvelope;
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
};
export type EventUncheckedCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutClassInput, Prisma.EventUncheckedCreateWithoutClassInput> | Prisma.EventCreateWithoutClassInput[] | Prisma.EventUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutClassInput | Prisma.EventCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.EventCreateManyClassInputEnvelope;
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
};
export type EventUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutClassInput, Prisma.EventUncheckedCreateWithoutClassInput> | Prisma.EventCreateWithoutClassInput[] | Prisma.EventUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutClassInput | Prisma.EventCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.EventUpsertWithWhereUniqueWithoutClassInput | Prisma.EventUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.EventCreateManyClassInputEnvelope;
    set?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    disconnect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    delete?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    update?: Prisma.EventUpdateWithWhereUniqueWithoutClassInput | Prisma.EventUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.EventUpdateManyWithWhereWithoutClassInput | Prisma.EventUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
};
export type EventUncheckedUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutClassInput, Prisma.EventUncheckedCreateWithoutClassInput> | Prisma.EventCreateWithoutClassInput[] | Prisma.EventUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutClassInput | Prisma.EventCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.EventUpsertWithWhereUniqueWithoutClassInput | Prisma.EventUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.EventCreateManyClassInputEnvelope;
    set?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    disconnect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    delete?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    update?: Prisma.EventUpdateWithWhereUniqueWithoutClassInput | Prisma.EventUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.EventUpdateManyWithWhereWithoutClassInput | Prisma.EventUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
};
export type EventCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutSubjectInput, Prisma.EventUncheckedCreateWithoutSubjectInput> | Prisma.EventCreateWithoutSubjectInput[] | Prisma.EventUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutSubjectInput | Prisma.EventCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.EventCreateManySubjectInputEnvelope;
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
};
export type EventUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutSubjectInput, Prisma.EventUncheckedCreateWithoutSubjectInput> | Prisma.EventCreateWithoutSubjectInput[] | Prisma.EventUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutSubjectInput | Prisma.EventCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.EventCreateManySubjectInputEnvelope;
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
};
export type EventUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutSubjectInput, Prisma.EventUncheckedCreateWithoutSubjectInput> | Prisma.EventCreateWithoutSubjectInput[] | Prisma.EventUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutSubjectInput | Prisma.EventCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.EventUpsertWithWhereUniqueWithoutSubjectInput | Prisma.EventUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.EventCreateManySubjectInputEnvelope;
    set?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    disconnect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    delete?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    update?: Prisma.EventUpdateWithWhereUniqueWithoutSubjectInput | Prisma.EventUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.EventUpdateManyWithWhereWithoutSubjectInput | Prisma.EventUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
};
export type EventUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutSubjectInput, Prisma.EventUncheckedCreateWithoutSubjectInput> | Prisma.EventCreateWithoutSubjectInput[] | Prisma.EventUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutSubjectInput | Prisma.EventCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.EventUpsertWithWhereUniqueWithoutSubjectInput | Prisma.EventUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.EventCreateManySubjectInputEnvelope;
    set?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    disconnect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    delete?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    update?: Prisma.EventUpdateWithWhereUniqueWithoutSubjectInput | Prisma.EventUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.EventUpdateManyWithWhereWithoutSubjectInput | Prisma.EventUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
};
export type EventCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutCreatedByInput, Prisma.EventUncheckedCreateWithoutCreatedByInput> | Prisma.EventCreateWithoutCreatedByInput[] | Prisma.EventUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutCreatedByInput | Prisma.EventCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.EventCreateManyCreatedByInputEnvelope;
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
};
export type EventUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutCreatedByInput, Prisma.EventUncheckedCreateWithoutCreatedByInput> | Prisma.EventCreateWithoutCreatedByInput[] | Prisma.EventUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutCreatedByInput | Prisma.EventCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.EventCreateManyCreatedByInputEnvelope;
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
};
export type EventUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutCreatedByInput, Prisma.EventUncheckedCreateWithoutCreatedByInput> | Prisma.EventCreateWithoutCreatedByInput[] | Prisma.EventUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutCreatedByInput | Prisma.EventCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.EventUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.EventUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.EventCreateManyCreatedByInputEnvelope;
    set?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    disconnect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    delete?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    update?: Prisma.EventUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.EventUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.EventUpdateManyWithWhereWithoutCreatedByInput | Prisma.EventUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
};
export type EventUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutCreatedByInput, Prisma.EventUncheckedCreateWithoutCreatedByInput> | Prisma.EventCreateWithoutCreatedByInput[] | Prisma.EventUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutCreatedByInput | Prisma.EventCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.EventUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.EventUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.EventCreateManyCreatedByInputEnvelope;
    set?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    disconnect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    delete?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    connect?: Prisma.EventWhereUniqueInput | Prisma.EventWhereUniqueInput[];
    update?: Prisma.EventUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.EventUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.EventUpdateManyWithWhereWithoutCreatedByInput | Prisma.EventUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
};
export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType;
};
export type EventCreateNestedOneWithoutRemindersInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutRemindersInput, Prisma.EventUncheckedCreateWithoutRemindersInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutRemindersInput;
    connect?: Prisma.EventWhereUniqueInput;
};
export type EventUpdateOneRequiredWithoutRemindersNestedInput = {
    create?: Prisma.XOR<Prisma.EventCreateWithoutRemindersInput, Prisma.EventUncheckedCreateWithoutRemindersInput>;
    connectOrCreate?: Prisma.EventCreateOrConnectWithoutRemindersInput;
    upsert?: Prisma.EventUpsertWithoutRemindersInput;
    connect?: Prisma.EventWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EventUpdateToOneWithWhereWithoutRemindersInput, Prisma.EventUpdateWithoutRemindersInput>, Prisma.EventUncheckedUpdateWithoutRemindersInput>;
};
export type EventCreateWithoutClassInput = {
    id?: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subject?: Prisma.SubjectCreateNestedOneWithoutEventsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutEventsCreatedInput;
    reminders?: Prisma.EventReminderCreateNestedManyWithoutEventInput;
};
export type EventUncheckedCreateWithoutClassInput = {
    id?: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reminders?: Prisma.EventReminderUncheckedCreateNestedManyWithoutEventInput;
};
export type EventCreateOrConnectWithoutClassInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutClassInput, Prisma.EventUncheckedCreateWithoutClassInput>;
};
export type EventCreateManyClassInputEnvelope = {
    data: Prisma.EventCreateManyClassInput | Prisma.EventCreateManyClassInput[];
    skipDuplicates?: boolean;
};
export type EventUpsertWithWhereUniqueWithoutClassInput = {
    where: Prisma.EventWhereUniqueInput;
    update: Prisma.XOR<Prisma.EventUpdateWithoutClassInput, Prisma.EventUncheckedUpdateWithoutClassInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutClassInput, Prisma.EventUncheckedCreateWithoutClassInput>;
};
export type EventUpdateWithWhereUniqueWithoutClassInput = {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutClassInput, Prisma.EventUncheckedUpdateWithoutClassInput>;
};
export type EventUpdateManyWithWhereWithoutClassInput = {
    where: Prisma.EventScalarWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateManyMutationInput, Prisma.EventUncheckedUpdateManyWithoutClassInput>;
};
export type EventScalarWhereInput = {
    AND?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
    OR?: Prisma.EventScalarWhereInput[];
    NOT?: Prisma.EventScalarWhereInput | Prisma.EventScalarWhereInput[];
    id?: Prisma.UuidFilter<"Event"> | string;
    classId?: Prisma.UuidFilter<"Event"> | string;
    type?: Prisma.EnumEventTypeFilter<"Event"> | $Enums.EventType;
    title?: Prisma.StringFilter<"Event"> | string;
    description?: Prisma.StringNullableFilter<"Event"> | string | null;
    subjectId?: Prisma.UuidNullableFilter<"Event"> | string | null;
    startsAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Event"> | Date | string | null;
    status?: Prisma.EnumContentStatusFilter<"Event"> | $Enums.ContentStatus;
    createdById?: Prisma.UuidFilter<"Event"> | string;
    createdAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Event"> | Date | string;
};
export type EventCreateWithoutSubjectInput = {
    id?: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutEventsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutEventsCreatedInput;
    reminders?: Prisma.EventReminderCreateNestedManyWithoutEventInput;
};
export type EventUncheckedCreateWithoutSubjectInput = {
    id?: string;
    classId: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reminders?: Prisma.EventReminderUncheckedCreateNestedManyWithoutEventInput;
};
export type EventCreateOrConnectWithoutSubjectInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutSubjectInput, Prisma.EventUncheckedCreateWithoutSubjectInput>;
};
export type EventCreateManySubjectInputEnvelope = {
    data: Prisma.EventCreateManySubjectInput | Prisma.EventCreateManySubjectInput[];
    skipDuplicates?: boolean;
};
export type EventUpsertWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.EventWhereUniqueInput;
    update: Prisma.XOR<Prisma.EventUpdateWithoutSubjectInput, Prisma.EventUncheckedUpdateWithoutSubjectInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutSubjectInput, Prisma.EventUncheckedCreateWithoutSubjectInput>;
};
export type EventUpdateWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutSubjectInput, Prisma.EventUncheckedUpdateWithoutSubjectInput>;
};
export type EventUpdateManyWithWhereWithoutSubjectInput = {
    where: Prisma.EventScalarWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateManyMutationInput, Prisma.EventUncheckedUpdateManyWithoutSubjectInput>;
};
export type EventCreateWithoutCreatedByInput = {
    id?: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutEventsInput;
    subject?: Prisma.SubjectCreateNestedOneWithoutEventsInput;
    reminders?: Prisma.EventReminderCreateNestedManyWithoutEventInput;
};
export type EventUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    classId: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reminders?: Prisma.EventReminderUncheckedCreateNestedManyWithoutEventInput;
};
export type EventCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutCreatedByInput, Prisma.EventUncheckedCreateWithoutCreatedByInput>;
};
export type EventCreateManyCreatedByInputEnvelope = {
    data: Prisma.EventCreateManyCreatedByInput | Prisma.EventCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type EventUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.EventWhereUniqueInput;
    update: Prisma.XOR<Prisma.EventUpdateWithoutCreatedByInput, Prisma.EventUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutCreatedByInput, Prisma.EventUncheckedCreateWithoutCreatedByInput>;
};
export type EventUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutCreatedByInput, Prisma.EventUncheckedUpdateWithoutCreatedByInput>;
};
export type EventUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.EventScalarWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateManyMutationInput, Prisma.EventUncheckedUpdateManyWithoutCreatedByInput>;
};
export type EventCreateWithoutRemindersInput = {
    id?: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutEventsInput;
    subject?: Prisma.SubjectCreateNestedOneWithoutEventsInput;
    createdBy: Prisma.UserCreateNestedOneWithoutEventsCreatedInput;
};
export type EventUncheckedCreateWithoutRemindersInput = {
    id?: string;
    classId: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EventCreateOrConnectWithoutRemindersInput = {
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateWithoutRemindersInput, Prisma.EventUncheckedCreateWithoutRemindersInput>;
};
export type EventUpsertWithoutRemindersInput = {
    update: Prisma.XOR<Prisma.EventUpdateWithoutRemindersInput, Prisma.EventUncheckedUpdateWithoutRemindersInput>;
    create: Prisma.XOR<Prisma.EventCreateWithoutRemindersInput, Prisma.EventUncheckedCreateWithoutRemindersInput>;
    where?: Prisma.EventWhereInput;
};
export type EventUpdateToOneWithWhereWithoutRemindersInput = {
    where?: Prisma.EventWhereInput;
    data: Prisma.XOR<Prisma.EventUpdateWithoutRemindersInput, Prisma.EventUncheckedUpdateWithoutRemindersInput>;
};
export type EventUpdateWithoutRemindersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutEventsNestedInput;
    subject?: Prisma.SubjectUpdateOneWithoutEventsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutEventsCreatedNestedInput;
};
export type EventUncheckedUpdateWithoutRemindersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventCreateManyClassInput = {
    id?: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EventUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subject?: Prisma.SubjectUpdateOneWithoutEventsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutEventsCreatedNestedInput;
    reminders?: Prisma.EventReminderUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reminders?: Prisma.EventReminderUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateManyWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventCreateManySubjectInput = {
    id?: string;
    classId: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EventUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutEventsNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutEventsCreatedNestedInput;
    reminders?: Prisma.EventReminderUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reminders?: Prisma.EventReminderUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateManyWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventCreateManyCreatedByInput = {
    id?: string;
    classId: string;
    type: $Enums.EventType;
    title: string;
    description?: string | null;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt?: Date | string | null;
    status?: $Enums.ContentStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EventUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutEventsNestedInput;
    subject?: Prisma.SubjectUpdateOneWithoutEventsNestedInput;
    reminders?: Prisma.EventReminderUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reminders?: Prisma.EventReminderUncheckedUpdateManyWithoutEventNestedInput;
};
export type EventUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventCountOutputType = {
    reminders: number;
};
export type EventCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reminders?: boolean | EventCountOutputTypeCountRemindersArgs;
};
export type EventCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCountOutputTypeSelect<ExtArgs> | null;
};
export type EventCountOutputTypeCountRemindersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventReminderWhereInput;
};
export type EventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    type?: boolean;
    title?: boolean;
    description?: boolean;
    subjectId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    status?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.Event$subjectArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reminders?: boolean | Prisma.Event$remindersArgs<ExtArgs>;
    _count?: boolean | Prisma.EventCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["event"]>;
export type EventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    type?: boolean;
    title?: boolean;
    description?: boolean;
    subjectId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    status?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.Event$subjectArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["event"]>;
export type EventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    type?: boolean;
    title?: boolean;
    description?: boolean;
    subjectId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    status?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.Event$subjectArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["event"]>;
export type EventSelectScalar = {
    id?: boolean;
    classId?: boolean;
    type?: boolean;
    title?: boolean;
    description?: boolean;
    subjectId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    status?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "classId" | "type" | "title" | "description" | "subjectId" | "startsAt" | "endsAt" | "status" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["event"]>;
export type EventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.Event$subjectArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reminders?: boolean | Prisma.Event$remindersArgs<ExtArgs>;
    _count?: boolean | Prisma.EventCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.Event$subjectArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.Event$subjectArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $EventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Event";
    objects: {
        class: Prisma.$ClassPayload<ExtArgs>;
        subject: Prisma.$SubjectPayload<ExtArgs> | null;
        createdBy: Prisma.$UserPayload<ExtArgs>;
        reminders: Prisma.$EventReminderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        classId: string;
        type: $Enums.EventType;
        title: string;
        description: string | null;
        subjectId: string | null;
        startsAt: Date;
        endsAt: Date | null;
        status: $Enums.ContentStatus;
        createdById: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["event"]>;
    composites: {};
};
export type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EventPayload, S>;
export type EventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EventCountAggregateInputType | true;
};
export interface EventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Event'];
        meta: {
            name: 'Event';
        };
    };
    findUnique<T extends EventFindUniqueArgs>(args: Prisma.SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EventFindFirstArgs>(args?: Prisma.SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EventFindManyArgs>(args?: Prisma.SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EventCreateArgs>(args: Prisma.SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EventCreateManyArgs>(args?: Prisma.SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EventDeleteArgs>(args: Prisma.SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EventUpdateArgs>(args: Prisma.SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EventDeleteManyArgs>(args?: Prisma.SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EventUpdateManyArgs>(args: Prisma.SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EventUpsertArgs>(args: Prisma.SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EventCountArgs>(args?: Prisma.Subset<T, EventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EventCountAggregateOutputType> : number>;
    aggregate<T extends EventAggregateArgs>(args: Prisma.Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>;
    groupBy<T extends EventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EventGroupByArgs['orderBy'];
    } : {
        orderBy?: EventGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EventFieldRefs;
}
export interface Prisma__EventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    class<T extends Prisma.ClassDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    subject<T extends Prisma.Event$subjectArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Event$subjectArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reminders<T extends Prisma.Event$remindersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Event$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EventFieldRefs {
    readonly id: Prisma.FieldRef<"Event", 'String'>;
    readonly classId: Prisma.FieldRef<"Event", 'String'>;
    readonly type: Prisma.FieldRef<"Event", 'EventType'>;
    readonly title: Prisma.FieldRef<"Event", 'String'>;
    readonly description: Prisma.FieldRef<"Event", 'String'>;
    readonly subjectId: Prisma.FieldRef<"Event", 'String'>;
    readonly startsAt: Prisma.FieldRef<"Event", 'DateTime'>;
    readonly endsAt: Prisma.FieldRef<"Event", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Event", 'ContentStatus'>;
    readonly createdById: Prisma.FieldRef<"Event", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Event", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Event", 'DateTime'>;
}
export type EventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where: Prisma.EventWhereUniqueInput;
};
export type EventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where: Prisma.EventWhereUniqueInput;
};
export type EventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
export type EventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
export type EventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
export type EventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventCreateInput, Prisma.EventUncheckedCreateInput>;
};
export type EventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EventCreateManyInput | Prisma.EventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    data: Prisma.EventCreateManyInput | Prisma.EventCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EventIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventUpdateInput, Prisma.EventUncheckedUpdateInput>;
    where: Prisma.EventWhereUniqueInput;
};
export type EventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EventUpdateManyMutationInput, Prisma.EventUncheckedUpdateManyInput>;
    where?: Prisma.EventWhereInput;
    limit?: number;
};
export type EventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventUpdateManyMutationInput, Prisma.EventUncheckedUpdateManyInput>;
    where?: Prisma.EventWhereInput;
    limit?: number;
    include?: Prisma.EventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where: Prisma.EventWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCreateInput, Prisma.EventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EventUpdateInput, Prisma.EventUncheckedUpdateInput>;
};
export type EventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where: Prisma.EventWhereUniqueInput;
};
export type EventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
    limit?: number;
};
export type Event$subjectArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    where?: Prisma.SubjectWhereInput;
};
export type Event$remindersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    where?: Prisma.EventReminderWhereInput;
    orderBy?: Prisma.EventReminderOrderByWithRelationInput | Prisma.EventReminderOrderByWithRelationInput[];
    cursor?: Prisma.EventReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventReminderScalarFieldEnum | Prisma.EventReminderScalarFieldEnum[];
};
export type EventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
};
