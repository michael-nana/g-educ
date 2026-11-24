import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StudySessionModel = runtime.Types.Result.DefaultSelection<Prisma.$StudySessionPayload>;
export type AggregateStudySession = {
    _count: StudySessionCountAggregateOutputType | null;
    _avg: StudySessionAvgAggregateOutputType | null;
    _sum: StudySessionSumAggregateOutputType | null;
    _min: StudySessionMinAggregateOutputType | null;
    _max: StudySessionMaxAggregateOutputType | null;
};
export type StudySessionAvgAggregateOutputType = {
    reminderMinutesBefore: number | null;
};
export type StudySessionSumAggregateOutputType = {
    reminderMinutesBefore: number | null;
};
export type StudySessionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    clientId: string | null;
    title: string | null;
    subjectId: string | null;
    startsAt: Date | null;
    endsAt: Date | null;
    recurrence: $Enums.Recurrence | null;
    recurrenceEndsOn: Date | null;
    reminderMinutesBefore: number | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type StudySessionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    clientId: string | null;
    title: string | null;
    subjectId: string | null;
    startsAt: Date | null;
    endsAt: Date | null;
    recurrence: $Enums.Recurrence | null;
    recurrenceEndsOn: Date | null;
    reminderMinutesBefore: number | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type StudySessionCountAggregateOutputType = {
    id: number;
    userId: number;
    clientId: number;
    title: number;
    subjectId: number;
    startsAt: number;
    endsAt: number;
    recurrence: number;
    recurrenceEndsOn: number;
    reminderMinutesBefore: number;
    completedAt: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type StudySessionAvgAggregateInputType = {
    reminderMinutesBefore?: true;
};
export type StudySessionSumAggregateInputType = {
    reminderMinutesBefore?: true;
};
export type StudySessionMinAggregateInputType = {
    id?: true;
    userId?: true;
    clientId?: true;
    title?: true;
    subjectId?: true;
    startsAt?: true;
    endsAt?: true;
    recurrence?: true;
    recurrenceEndsOn?: true;
    reminderMinutesBefore?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type StudySessionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    clientId?: true;
    title?: true;
    subjectId?: true;
    startsAt?: true;
    endsAt?: true;
    recurrence?: true;
    recurrenceEndsOn?: true;
    reminderMinutesBefore?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type StudySessionCountAggregateInputType = {
    id?: true;
    userId?: true;
    clientId?: true;
    title?: true;
    subjectId?: true;
    startsAt?: true;
    endsAt?: true;
    recurrence?: true;
    recurrenceEndsOn?: true;
    reminderMinutesBefore?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type StudySessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudySessionWhereInput;
    orderBy?: Prisma.StudySessionOrderByWithRelationInput | Prisma.StudySessionOrderByWithRelationInput[];
    cursor?: Prisma.StudySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StudySessionCountAggregateInputType;
    _avg?: StudySessionAvgAggregateInputType;
    _sum?: StudySessionSumAggregateInputType;
    _min?: StudySessionMinAggregateInputType;
    _max?: StudySessionMaxAggregateInputType;
};
export type GetStudySessionAggregateType<T extends StudySessionAggregateArgs> = {
    [P in keyof T & keyof AggregateStudySession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStudySession[P]> : Prisma.GetScalarType<T[P], AggregateStudySession[P]>;
};
export type StudySessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudySessionWhereInput;
    orderBy?: Prisma.StudySessionOrderByWithAggregationInput | Prisma.StudySessionOrderByWithAggregationInput[];
    by: Prisma.StudySessionScalarFieldEnum[] | Prisma.StudySessionScalarFieldEnum;
    having?: Prisma.StudySessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StudySessionCountAggregateInputType | true;
    _avg?: StudySessionAvgAggregateInputType;
    _sum?: StudySessionSumAggregateInputType;
    _min?: StudySessionMinAggregateInputType;
    _max?: StudySessionMaxAggregateInputType;
};
export type StudySessionGroupByOutputType = {
    id: string;
    userId: string;
    clientId: string;
    title: string;
    subjectId: string | null;
    startsAt: Date;
    endsAt: Date;
    recurrence: $Enums.Recurrence;
    recurrenceEndsOn: Date | null;
    reminderMinutesBefore: number;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: StudySessionCountAggregateOutputType | null;
    _avg: StudySessionAvgAggregateOutputType | null;
    _sum: StudySessionSumAggregateOutputType | null;
    _min: StudySessionMinAggregateOutputType | null;
    _max: StudySessionMaxAggregateOutputType | null;
};
export type GetStudySessionGroupByPayload<T extends StudySessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StudySessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StudySessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StudySessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StudySessionGroupByOutputType[P]>;
}>>;
export type StudySessionWhereInput = {
    AND?: Prisma.StudySessionWhereInput | Prisma.StudySessionWhereInput[];
    OR?: Prisma.StudySessionWhereInput[];
    NOT?: Prisma.StudySessionWhereInput | Prisma.StudySessionWhereInput[];
    id?: Prisma.UuidFilter<"StudySession"> | string;
    userId?: Prisma.UuidFilter<"StudySession"> | string;
    clientId?: Prisma.UuidFilter<"StudySession"> | string;
    title?: Prisma.StringFilter<"StudySession"> | string;
    subjectId?: Prisma.UuidNullableFilter<"StudySession"> | string | null;
    startsAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    endsAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    recurrence?: Prisma.EnumRecurrenceFilter<"StudySession"> | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFilter<"StudySession"> | number;
    completedAt?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    subject?: Prisma.XOR<Prisma.SubjectNullableScalarRelationFilter, Prisma.SubjectWhereInput> | null;
};
export type StudySessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    recurrence?: Prisma.SortOrder;
    recurrenceEndsOn?: Prisma.SortOrderInput | Prisma.SortOrder;
    reminderMinutesBefore?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    subject?: Prisma.SubjectOrderByWithRelationInput;
};
export type StudySessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_clientId?: Prisma.StudySessionUserIdClientIdCompoundUniqueInput;
    AND?: Prisma.StudySessionWhereInput | Prisma.StudySessionWhereInput[];
    OR?: Prisma.StudySessionWhereInput[];
    NOT?: Prisma.StudySessionWhereInput | Prisma.StudySessionWhereInput[];
    userId?: Prisma.UuidFilter<"StudySession"> | string;
    clientId?: Prisma.UuidFilter<"StudySession"> | string;
    title?: Prisma.StringFilter<"StudySession"> | string;
    subjectId?: Prisma.UuidNullableFilter<"StudySession"> | string | null;
    startsAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    endsAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    recurrence?: Prisma.EnumRecurrenceFilter<"StudySession"> | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFilter<"StudySession"> | number;
    completedAt?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    subject?: Prisma.XOR<Prisma.SubjectNullableScalarRelationFilter, Prisma.SubjectWhereInput> | null;
}, "id" | "userId_clientId">;
export type StudySessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    recurrence?: Prisma.SortOrder;
    recurrenceEndsOn?: Prisma.SortOrderInput | Prisma.SortOrder;
    reminderMinutesBefore?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StudySessionCountOrderByAggregateInput;
    _avg?: Prisma.StudySessionAvgOrderByAggregateInput;
    _max?: Prisma.StudySessionMaxOrderByAggregateInput;
    _min?: Prisma.StudySessionMinOrderByAggregateInput;
    _sum?: Prisma.StudySessionSumOrderByAggregateInput;
};
export type StudySessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.StudySessionScalarWhereWithAggregatesInput | Prisma.StudySessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.StudySessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StudySessionScalarWhereWithAggregatesInput | Prisma.StudySessionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"StudySession"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"StudySession"> | string;
    clientId?: Prisma.UuidWithAggregatesFilter<"StudySession"> | string;
    title?: Prisma.StringWithAggregatesFilter<"StudySession"> | string;
    subjectId?: Prisma.UuidNullableWithAggregatesFilter<"StudySession"> | string | null;
    startsAt?: Prisma.DateTimeWithAggregatesFilter<"StudySession"> | Date | string;
    endsAt?: Prisma.DateTimeWithAggregatesFilter<"StudySession"> | Date | string;
    recurrence?: Prisma.EnumRecurrenceWithAggregatesFilter<"StudySession"> | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.DateTimeNullableWithAggregatesFilter<"StudySession"> | Date | string | null;
    reminderMinutesBefore?: Prisma.IntWithAggregatesFilter<"StudySession"> | number;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"StudySession"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StudySession"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"StudySession"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"StudySession"> | Date | string | null;
};
export type StudySessionCreateInput = {
    id?: string;
    clientId: string;
    title: string;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutStudySessionsInput;
    subject?: Prisma.SubjectCreateNestedOneWithoutStudySessionsInput;
};
export type StudySessionUncheckedCreateInput = {
    id?: string;
    userId: string;
    clientId: string;
    title: string;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type StudySessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutStudySessionsNestedInput;
    subject?: Prisma.SubjectUpdateOneWithoutStudySessionsNestedInput;
};
export type StudySessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudySessionCreateManyInput = {
    id?: string;
    userId: string;
    clientId: string;
    title: string;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type StudySessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudySessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudySessionListRelationFilter = {
    every?: Prisma.StudySessionWhereInput;
    some?: Prisma.StudySessionWhereInput;
    none?: Prisma.StudySessionWhereInput;
};
export type StudySessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StudySessionUserIdClientIdCompoundUniqueInput = {
    userId: string;
    clientId: string;
};
export type StudySessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    recurrence?: Prisma.SortOrder;
    recurrenceEndsOn?: Prisma.SortOrder;
    reminderMinutesBefore?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StudySessionAvgOrderByAggregateInput = {
    reminderMinutesBefore?: Prisma.SortOrder;
};
export type StudySessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    recurrence?: Prisma.SortOrder;
    recurrenceEndsOn?: Prisma.SortOrder;
    reminderMinutesBefore?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StudySessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    recurrence?: Prisma.SortOrder;
    recurrenceEndsOn?: Prisma.SortOrder;
    reminderMinutesBefore?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type StudySessionSumOrderByAggregateInput = {
    reminderMinutesBefore?: Prisma.SortOrder;
};
export type StudySessionCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.StudySessionCreateWithoutSubjectInput, Prisma.StudySessionUncheckedCreateWithoutSubjectInput> | Prisma.StudySessionCreateWithoutSubjectInput[] | Prisma.StudySessionUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.StudySessionCreateOrConnectWithoutSubjectInput | Prisma.StudySessionCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.StudySessionCreateManySubjectInputEnvelope;
    connect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
};
export type StudySessionUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.StudySessionCreateWithoutSubjectInput, Prisma.StudySessionUncheckedCreateWithoutSubjectInput> | Prisma.StudySessionCreateWithoutSubjectInput[] | Prisma.StudySessionUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.StudySessionCreateOrConnectWithoutSubjectInput | Prisma.StudySessionCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.StudySessionCreateManySubjectInputEnvelope;
    connect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
};
export type StudySessionUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.StudySessionCreateWithoutSubjectInput, Prisma.StudySessionUncheckedCreateWithoutSubjectInput> | Prisma.StudySessionCreateWithoutSubjectInput[] | Prisma.StudySessionUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.StudySessionCreateOrConnectWithoutSubjectInput | Prisma.StudySessionCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.StudySessionUpsertWithWhereUniqueWithoutSubjectInput | Prisma.StudySessionUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.StudySessionCreateManySubjectInputEnvelope;
    set?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    disconnect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    delete?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    connect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    update?: Prisma.StudySessionUpdateWithWhereUniqueWithoutSubjectInput | Prisma.StudySessionUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.StudySessionUpdateManyWithWhereWithoutSubjectInput | Prisma.StudySessionUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.StudySessionScalarWhereInput | Prisma.StudySessionScalarWhereInput[];
};
export type StudySessionUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.StudySessionCreateWithoutSubjectInput, Prisma.StudySessionUncheckedCreateWithoutSubjectInput> | Prisma.StudySessionCreateWithoutSubjectInput[] | Prisma.StudySessionUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.StudySessionCreateOrConnectWithoutSubjectInput | Prisma.StudySessionCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.StudySessionUpsertWithWhereUniqueWithoutSubjectInput | Prisma.StudySessionUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.StudySessionCreateManySubjectInputEnvelope;
    set?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    disconnect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    delete?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    connect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    update?: Prisma.StudySessionUpdateWithWhereUniqueWithoutSubjectInput | Prisma.StudySessionUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.StudySessionUpdateManyWithWhereWithoutSubjectInput | Prisma.StudySessionUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.StudySessionScalarWhereInput | Prisma.StudySessionScalarWhereInput[];
};
export type StudySessionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudySessionCreateWithoutUserInput, Prisma.StudySessionUncheckedCreateWithoutUserInput> | Prisma.StudySessionCreateWithoutUserInput[] | Prisma.StudySessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudySessionCreateOrConnectWithoutUserInput | Prisma.StudySessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StudySessionCreateManyUserInputEnvelope;
    connect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
};
export type StudySessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudySessionCreateWithoutUserInput, Prisma.StudySessionUncheckedCreateWithoutUserInput> | Prisma.StudySessionCreateWithoutUserInput[] | Prisma.StudySessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudySessionCreateOrConnectWithoutUserInput | Prisma.StudySessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StudySessionCreateManyUserInputEnvelope;
    connect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
};
export type StudySessionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudySessionCreateWithoutUserInput, Prisma.StudySessionUncheckedCreateWithoutUserInput> | Prisma.StudySessionCreateWithoutUserInput[] | Prisma.StudySessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudySessionCreateOrConnectWithoutUserInput | Prisma.StudySessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StudySessionUpsertWithWhereUniqueWithoutUserInput | Prisma.StudySessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StudySessionCreateManyUserInputEnvelope;
    set?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    disconnect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    delete?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    connect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    update?: Prisma.StudySessionUpdateWithWhereUniqueWithoutUserInput | Prisma.StudySessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StudySessionUpdateManyWithWhereWithoutUserInput | Prisma.StudySessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StudySessionScalarWhereInput | Prisma.StudySessionScalarWhereInput[];
};
export type StudySessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudySessionCreateWithoutUserInput, Prisma.StudySessionUncheckedCreateWithoutUserInput> | Prisma.StudySessionCreateWithoutUserInput[] | Prisma.StudySessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudySessionCreateOrConnectWithoutUserInput | Prisma.StudySessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StudySessionUpsertWithWhereUniqueWithoutUserInput | Prisma.StudySessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StudySessionCreateManyUserInputEnvelope;
    set?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    disconnect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    delete?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    connect?: Prisma.StudySessionWhereUniqueInput | Prisma.StudySessionWhereUniqueInput[];
    update?: Prisma.StudySessionUpdateWithWhereUniqueWithoutUserInput | Prisma.StudySessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StudySessionUpdateManyWithWhereWithoutUserInput | Prisma.StudySessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StudySessionScalarWhereInput | Prisma.StudySessionScalarWhereInput[];
};
export type EnumRecurrenceFieldUpdateOperationsInput = {
    set?: $Enums.Recurrence;
};
export type StudySessionCreateWithoutSubjectInput = {
    id?: string;
    clientId: string;
    title: string;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutStudySessionsInput;
};
export type StudySessionUncheckedCreateWithoutSubjectInput = {
    id?: string;
    userId: string;
    clientId: string;
    title: string;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type StudySessionCreateOrConnectWithoutSubjectInput = {
    where: Prisma.StudySessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudySessionCreateWithoutSubjectInput, Prisma.StudySessionUncheckedCreateWithoutSubjectInput>;
};
export type StudySessionCreateManySubjectInputEnvelope = {
    data: Prisma.StudySessionCreateManySubjectInput | Prisma.StudySessionCreateManySubjectInput[];
    skipDuplicates?: boolean;
};
export type StudySessionUpsertWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.StudySessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudySessionUpdateWithoutSubjectInput, Prisma.StudySessionUncheckedUpdateWithoutSubjectInput>;
    create: Prisma.XOR<Prisma.StudySessionCreateWithoutSubjectInput, Prisma.StudySessionUncheckedCreateWithoutSubjectInput>;
};
export type StudySessionUpdateWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.StudySessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudySessionUpdateWithoutSubjectInput, Prisma.StudySessionUncheckedUpdateWithoutSubjectInput>;
};
export type StudySessionUpdateManyWithWhereWithoutSubjectInput = {
    where: Prisma.StudySessionScalarWhereInput;
    data: Prisma.XOR<Prisma.StudySessionUpdateManyMutationInput, Prisma.StudySessionUncheckedUpdateManyWithoutSubjectInput>;
};
export type StudySessionScalarWhereInput = {
    AND?: Prisma.StudySessionScalarWhereInput | Prisma.StudySessionScalarWhereInput[];
    OR?: Prisma.StudySessionScalarWhereInput[];
    NOT?: Prisma.StudySessionScalarWhereInput | Prisma.StudySessionScalarWhereInput[];
    id?: Prisma.UuidFilter<"StudySession"> | string;
    userId?: Prisma.UuidFilter<"StudySession"> | string;
    clientId?: Prisma.UuidFilter<"StudySession"> | string;
    title?: Prisma.StringFilter<"StudySession"> | string;
    subjectId?: Prisma.UuidNullableFilter<"StudySession"> | string | null;
    startsAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    endsAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    recurrence?: Prisma.EnumRecurrenceFilter<"StudySession"> | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFilter<"StudySession"> | number;
    completedAt?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StudySession"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"StudySession"> | Date | string | null;
};
export type StudySessionCreateWithoutUserInput = {
    id?: string;
    clientId: string;
    title: string;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    subject?: Prisma.SubjectCreateNestedOneWithoutStudySessionsInput;
};
export type StudySessionUncheckedCreateWithoutUserInput = {
    id?: string;
    clientId: string;
    title: string;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type StudySessionCreateOrConnectWithoutUserInput = {
    where: Prisma.StudySessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudySessionCreateWithoutUserInput, Prisma.StudySessionUncheckedCreateWithoutUserInput>;
};
export type StudySessionCreateManyUserInputEnvelope = {
    data: Prisma.StudySessionCreateManyUserInput | Prisma.StudySessionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type StudySessionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.StudySessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudySessionUpdateWithoutUserInput, Prisma.StudySessionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StudySessionCreateWithoutUserInput, Prisma.StudySessionUncheckedCreateWithoutUserInput>;
};
export type StudySessionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.StudySessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudySessionUpdateWithoutUserInput, Prisma.StudySessionUncheckedUpdateWithoutUserInput>;
};
export type StudySessionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.StudySessionScalarWhereInput;
    data: Prisma.XOR<Prisma.StudySessionUpdateManyMutationInput, Prisma.StudySessionUncheckedUpdateManyWithoutUserInput>;
};
export type StudySessionCreateManySubjectInput = {
    id?: string;
    userId: string;
    clientId: string;
    title: string;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type StudySessionUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutStudySessionsNestedInput;
};
export type StudySessionUncheckedUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudySessionUncheckedUpdateManyWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudySessionCreateManyUserInput = {
    id?: string;
    clientId: string;
    title: string;
    subjectId?: string | null;
    startsAt: Date | string;
    endsAt: Date | string;
    recurrence?: $Enums.Recurrence;
    recurrenceEndsOn?: Date | string | null;
    reminderMinutesBefore?: number;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type StudySessionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    subject?: Prisma.SubjectUpdateOneWithoutStudySessionsNestedInput;
};
export type StudySessionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudySessionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recurrence?: Prisma.EnumRecurrenceFieldUpdateOperationsInput | $Enums.Recurrence;
    recurrenceEndsOn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reminderMinutesBefore?: Prisma.IntFieldUpdateOperationsInput | number;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudySessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    clientId?: boolean;
    title?: boolean;
    subjectId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    recurrence?: boolean;
    recurrenceEndsOn?: boolean;
    reminderMinutesBefore?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.StudySession$subjectArgs<ExtArgs>;
}, ExtArgs["result"]["studySession"]>;
export type StudySessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    clientId?: boolean;
    title?: boolean;
    subjectId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    recurrence?: boolean;
    recurrenceEndsOn?: boolean;
    reminderMinutesBefore?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.StudySession$subjectArgs<ExtArgs>;
}, ExtArgs["result"]["studySession"]>;
export type StudySessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    clientId?: boolean;
    title?: boolean;
    subjectId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    recurrence?: boolean;
    recurrenceEndsOn?: boolean;
    reminderMinutesBefore?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.StudySession$subjectArgs<ExtArgs>;
}, ExtArgs["result"]["studySession"]>;
export type StudySessionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    clientId?: boolean;
    title?: boolean;
    subjectId?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    recurrence?: boolean;
    recurrenceEndsOn?: boolean;
    reminderMinutesBefore?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type StudySessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "clientId" | "title" | "subjectId" | "startsAt" | "endsAt" | "recurrence" | "recurrenceEndsOn" | "reminderMinutesBefore" | "completedAt" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["studySession"]>;
export type StudySessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.StudySession$subjectArgs<ExtArgs>;
};
export type StudySessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.StudySession$subjectArgs<ExtArgs>;
};
export type StudySessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.StudySession$subjectArgs<ExtArgs>;
};
export type $StudySessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StudySession";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        subject: Prisma.$SubjectPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        clientId: string;
        title: string;
        subjectId: string | null;
        startsAt: Date;
        endsAt: Date;
        recurrence: $Enums.Recurrence;
        recurrenceEndsOn: Date | null;
        reminderMinutesBefore: number;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["studySession"]>;
    composites: {};
};
export type StudySessionGetPayload<S extends boolean | null | undefined | StudySessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StudySessionPayload, S>;
export type StudySessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StudySessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StudySessionCountAggregateInputType | true;
};
export interface StudySessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StudySession'];
        meta: {
            name: 'StudySession';
        };
    };
    findUnique<T extends StudySessionFindUniqueArgs>(args: Prisma.SelectSubset<T, StudySessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StudySessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StudySessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StudySessionFindFirstArgs>(args?: Prisma.SelectSubset<T, StudySessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StudySessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StudySessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StudySessionFindManyArgs>(args?: Prisma.SelectSubset<T, StudySessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StudySessionCreateArgs>(args: Prisma.SelectSubset<T, StudySessionCreateArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StudySessionCreateManyArgs>(args?: Prisma.SelectSubset<T, StudySessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StudySessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StudySessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StudySessionDeleteArgs>(args: Prisma.SelectSubset<T, StudySessionDeleteArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StudySessionUpdateArgs>(args: Prisma.SelectSubset<T, StudySessionUpdateArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StudySessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, StudySessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StudySessionUpdateManyArgs>(args: Prisma.SelectSubset<T, StudySessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StudySessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StudySessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StudySessionUpsertArgs>(args: Prisma.SelectSubset<T, StudySessionUpsertArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StudySessionCountArgs>(args?: Prisma.Subset<T, StudySessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StudySessionCountAggregateOutputType> : number>;
    aggregate<T extends StudySessionAggregateArgs>(args: Prisma.Subset<T, StudySessionAggregateArgs>): Prisma.PrismaPromise<GetStudySessionAggregateType<T>>;
    groupBy<T extends StudySessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StudySessionGroupByArgs['orderBy'];
    } : {
        orderBy?: StudySessionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StudySessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudySessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StudySessionFieldRefs;
}
export interface Prisma__StudySessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    subject<T extends Prisma.StudySession$subjectArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudySession$subjectArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StudySessionFieldRefs {
    readonly id: Prisma.FieldRef<"StudySession", 'String'>;
    readonly userId: Prisma.FieldRef<"StudySession", 'String'>;
    readonly clientId: Prisma.FieldRef<"StudySession", 'String'>;
    readonly title: Prisma.FieldRef<"StudySession", 'String'>;
    readonly subjectId: Prisma.FieldRef<"StudySession", 'String'>;
    readonly startsAt: Prisma.FieldRef<"StudySession", 'DateTime'>;
    readonly endsAt: Prisma.FieldRef<"StudySession", 'DateTime'>;
    readonly recurrence: Prisma.FieldRef<"StudySession", 'Recurrence'>;
    readonly recurrenceEndsOn: Prisma.FieldRef<"StudySession", 'DateTime'>;
    readonly reminderMinutesBefore: Prisma.FieldRef<"StudySession", 'Int'>;
    readonly completedAt: Prisma.FieldRef<"StudySession", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"StudySession", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"StudySession", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"StudySession", 'DateTime'>;
}
export type StudySessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    where: Prisma.StudySessionWhereUniqueInput;
};
export type StudySessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    where: Prisma.StudySessionWhereUniqueInput;
};
export type StudySessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    where?: Prisma.StudySessionWhereInput;
    orderBy?: Prisma.StudySessionOrderByWithRelationInput | Prisma.StudySessionOrderByWithRelationInput[];
    cursor?: Prisma.StudySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudySessionScalarFieldEnum | Prisma.StudySessionScalarFieldEnum[];
};
export type StudySessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    where?: Prisma.StudySessionWhereInput;
    orderBy?: Prisma.StudySessionOrderByWithRelationInput | Prisma.StudySessionOrderByWithRelationInput[];
    cursor?: Prisma.StudySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudySessionScalarFieldEnum | Prisma.StudySessionScalarFieldEnum[];
};
export type StudySessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    where?: Prisma.StudySessionWhereInput;
    orderBy?: Prisma.StudySessionOrderByWithRelationInput | Prisma.StudySessionOrderByWithRelationInput[];
    cursor?: Prisma.StudySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudySessionScalarFieldEnum | Prisma.StudySessionScalarFieldEnum[];
};
export type StudySessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudySessionCreateInput, Prisma.StudySessionUncheckedCreateInput>;
};
export type StudySessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StudySessionCreateManyInput | Prisma.StudySessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StudySessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    data: Prisma.StudySessionCreateManyInput | Prisma.StudySessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StudySessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StudySessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudySessionUpdateInput, Prisma.StudySessionUncheckedUpdateInput>;
    where: Prisma.StudySessionWhereUniqueInput;
};
export type StudySessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StudySessionUpdateManyMutationInput, Prisma.StudySessionUncheckedUpdateManyInput>;
    where?: Prisma.StudySessionWhereInput;
    limit?: number;
};
export type StudySessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudySessionUpdateManyMutationInput, Prisma.StudySessionUncheckedUpdateManyInput>;
    where?: Prisma.StudySessionWhereInput;
    limit?: number;
    include?: Prisma.StudySessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StudySessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    where: Prisma.StudySessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudySessionCreateInput, Prisma.StudySessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StudySessionUpdateInput, Prisma.StudySessionUncheckedUpdateInput>;
};
export type StudySessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    where: Prisma.StudySessionWhereUniqueInput;
};
export type StudySessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudySessionWhereInput;
    limit?: number;
};
export type StudySession$subjectArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    where?: Prisma.SubjectWhereInput;
};
export type StudySessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
};
