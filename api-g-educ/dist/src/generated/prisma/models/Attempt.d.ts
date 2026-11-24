import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AttemptModel = runtime.Types.Result.DefaultSelection<Prisma.$AttemptPayload>;
export type AggregateAttempt = {
    _count: AttemptCountAggregateOutputType | null;
    _avg: AttemptAvgAggregateOutputType | null;
    _sum: AttemptSumAggregateOutputType | null;
    _min: AttemptMinAggregateOutputType | null;
    _max: AttemptMaxAggregateOutputType | null;
};
export type AttemptAvgAggregateOutputType = {
    assessmentVersion: number | null;
    score: number | null;
    maxScore: number | null;
    durationSeconds: number | null;
};
export type AttemptSumAggregateOutputType = {
    assessmentVersion: number | null;
    score: number | null;
    maxScore: number | null;
    durationSeconds: number | null;
};
export type AttemptMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    assessmentId: string | null;
    assessmentVersion: number | null;
    clientId: string | null;
    status: $Enums.AttemptStatus | null;
    startedAt: Date | null;
    submittedAt: Date | null;
    score: number | null;
    maxScore: number | null;
    durationSeconds: number | null;
    createdAt: Date | null;
};
export type AttemptMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    assessmentId: string | null;
    assessmentVersion: number | null;
    clientId: string | null;
    status: $Enums.AttemptStatus | null;
    startedAt: Date | null;
    submittedAt: Date | null;
    score: number | null;
    maxScore: number | null;
    durationSeconds: number | null;
    createdAt: Date | null;
};
export type AttemptCountAggregateOutputType = {
    id: number;
    userId: number;
    assessmentId: number;
    assessmentVersion: number;
    clientId: number;
    status: number;
    startedAt: number;
    submittedAt: number;
    score: number;
    maxScore: number;
    durationSeconds: number;
    createdAt: number;
    _all: number;
};
export type AttemptAvgAggregateInputType = {
    assessmentVersion?: true;
    score?: true;
    maxScore?: true;
    durationSeconds?: true;
};
export type AttemptSumAggregateInputType = {
    assessmentVersion?: true;
    score?: true;
    maxScore?: true;
    durationSeconds?: true;
};
export type AttemptMinAggregateInputType = {
    id?: true;
    userId?: true;
    assessmentId?: true;
    assessmentVersion?: true;
    clientId?: true;
    status?: true;
    startedAt?: true;
    submittedAt?: true;
    score?: true;
    maxScore?: true;
    durationSeconds?: true;
    createdAt?: true;
};
export type AttemptMaxAggregateInputType = {
    id?: true;
    userId?: true;
    assessmentId?: true;
    assessmentVersion?: true;
    clientId?: true;
    status?: true;
    startedAt?: true;
    submittedAt?: true;
    score?: true;
    maxScore?: true;
    durationSeconds?: true;
    createdAt?: true;
};
export type AttemptCountAggregateInputType = {
    id?: true;
    userId?: true;
    assessmentId?: true;
    assessmentVersion?: true;
    clientId?: true;
    status?: true;
    startedAt?: true;
    submittedAt?: true;
    score?: true;
    maxScore?: true;
    durationSeconds?: true;
    createdAt?: true;
    _all?: true;
};
export type AttemptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AttemptCountAggregateInputType;
    _avg?: AttemptAvgAggregateInputType;
    _sum?: AttemptSumAggregateInputType;
    _min?: AttemptMinAggregateInputType;
    _max?: AttemptMaxAggregateInputType;
};
export type GetAttemptAggregateType<T extends AttemptAggregateArgs> = {
    [P in keyof T & keyof AggregateAttempt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAttempt[P]> : Prisma.GetScalarType<T[P], AggregateAttempt[P]>;
};
export type AttemptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithAggregationInput | Prisma.AttemptOrderByWithAggregationInput[];
    by: Prisma.AttemptScalarFieldEnum[] | Prisma.AttemptScalarFieldEnum;
    having?: Prisma.AttemptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AttemptCountAggregateInputType | true;
    _avg?: AttemptAvgAggregateInputType;
    _sum?: AttemptSumAggregateInputType;
    _min?: AttemptMinAggregateInputType;
    _max?: AttemptMaxAggregateInputType;
};
export type AttemptGroupByOutputType = {
    id: string;
    userId: string;
    assessmentId: string;
    assessmentVersion: number;
    clientId: string;
    status: $Enums.AttemptStatus;
    startedAt: Date;
    submittedAt: Date | null;
    score: number | null;
    maxScore: number | null;
    durationSeconds: number | null;
    createdAt: Date;
    _count: AttemptCountAggregateOutputType | null;
    _avg: AttemptAvgAggregateOutputType | null;
    _sum: AttemptSumAggregateOutputType | null;
    _min: AttemptMinAggregateOutputType | null;
    _max: AttemptMaxAggregateOutputType | null;
};
export type GetAttemptGroupByPayload<T extends AttemptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AttemptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AttemptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AttemptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AttemptGroupByOutputType[P]>;
}>>;
export type AttemptWhereInput = {
    AND?: Prisma.AttemptWhereInput | Prisma.AttemptWhereInput[];
    OR?: Prisma.AttemptWhereInput[];
    NOT?: Prisma.AttemptWhereInput | Prisma.AttemptWhereInput[];
    id?: Prisma.UuidFilter<"Attempt"> | string;
    userId?: Prisma.UuidFilter<"Attempt"> | string;
    assessmentId?: Prisma.UuidFilter<"Attempt"> | string;
    assessmentVersion?: Prisma.IntFilter<"Attempt"> | number;
    clientId?: Prisma.UuidFilter<"Attempt"> | string;
    status?: Prisma.EnumAttemptStatusFilter<"Attempt"> | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
    submittedAt?: Prisma.DateTimeNullableFilter<"Attempt"> | Date | string | null;
    score?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    maxScore?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    durationSeconds?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assessment?: Prisma.XOR<Prisma.AssessmentScalarRelationFilter, Prisma.AssessmentWhereInput>;
    answers?: Prisma.AttemptAnswerListRelationFilter;
};
export type AttemptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    assessmentVersion?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    maxScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    assessment?: Prisma.AssessmentOrderByWithRelationInput;
    answers?: Prisma.AttemptAnswerOrderByRelationAggregateInput;
};
export type AttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_clientId?: Prisma.AttemptUserIdClientIdCompoundUniqueInput;
    AND?: Prisma.AttemptWhereInput | Prisma.AttemptWhereInput[];
    OR?: Prisma.AttemptWhereInput[];
    NOT?: Prisma.AttemptWhereInput | Prisma.AttemptWhereInput[];
    userId?: Prisma.UuidFilter<"Attempt"> | string;
    assessmentId?: Prisma.UuidFilter<"Attempt"> | string;
    assessmentVersion?: Prisma.IntFilter<"Attempt"> | number;
    clientId?: Prisma.UuidFilter<"Attempt"> | string;
    status?: Prisma.EnumAttemptStatusFilter<"Attempt"> | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
    submittedAt?: Prisma.DateTimeNullableFilter<"Attempt"> | Date | string | null;
    score?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    maxScore?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    durationSeconds?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assessment?: Prisma.XOR<Prisma.AssessmentScalarRelationFilter, Prisma.AssessmentWhereInput>;
    answers?: Prisma.AttemptAnswerListRelationFilter;
}, "id" | "userId_clientId">;
export type AttemptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    assessmentVersion?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    maxScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AttemptCountOrderByAggregateInput;
    _avg?: Prisma.AttemptAvgOrderByAggregateInput;
    _max?: Prisma.AttemptMaxOrderByAggregateInput;
    _min?: Prisma.AttemptMinOrderByAggregateInput;
    _sum?: Prisma.AttemptSumOrderByAggregateInput;
};
export type AttemptScalarWhereWithAggregatesInput = {
    AND?: Prisma.AttemptScalarWhereWithAggregatesInput | Prisma.AttemptScalarWhereWithAggregatesInput[];
    OR?: Prisma.AttemptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AttemptScalarWhereWithAggregatesInput | Prisma.AttemptScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Attempt"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"Attempt"> | string;
    assessmentId?: Prisma.UuidWithAggregatesFilter<"Attempt"> | string;
    assessmentVersion?: Prisma.IntWithAggregatesFilter<"Attempt"> | number;
    clientId?: Prisma.UuidWithAggregatesFilter<"Attempt"> | string;
    status?: Prisma.EnumAttemptStatusWithAggregatesFilter<"Attempt"> | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeWithAggregatesFilter<"Attempt"> | Date | string;
    submittedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Attempt"> | Date | string | null;
    score?: Prisma.IntNullableWithAggregatesFilter<"Attempt"> | number | null;
    maxScore?: Prisma.IntNullableWithAggregatesFilter<"Attempt"> | number | null;
    durationSeconds?: Prisma.IntNullableWithAggregatesFilter<"Attempt"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Attempt"> | Date | string;
};
export type AttemptCreateInput = {
    id?: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAttemptsInput;
    assessment: Prisma.AssessmentCreateNestedOneWithoutAttemptsInput;
    answers?: Prisma.AttemptAnswerCreateNestedManyWithoutAttemptInput;
};
export type AttemptUncheckedCreateInput = {
    id?: string;
    userId: string;
    assessmentId: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
    answers?: Prisma.AttemptAnswerUncheckedCreateNestedManyWithoutAttemptInput;
};
export type AttemptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAttemptsNestedInput;
    assessment?: Prisma.AssessmentUpdateOneRequiredWithoutAttemptsNestedInput;
    answers?: Prisma.AttemptAnswerUpdateManyWithoutAttemptNestedInput;
};
export type AttemptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.AttemptAnswerUncheckedUpdateManyWithoutAttemptNestedInput;
};
export type AttemptCreateManyInput = {
    id?: string;
    userId: string;
    assessmentId: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
};
export type AttemptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptListRelationFilter = {
    every?: Prisma.AttemptWhereInput;
    some?: Prisma.AttemptWhereInput;
    none?: Prisma.AttemptWhereInput;
};
export type AttemptOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AttemptUserIdClientIdCompoundUniqueInput = {
    userId: string;
    clientId: string;
};
export type AttemptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    assessmentVersion?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    maxScore?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttemptAvgOrderByAggregateInput = {
    assessmentVersion?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    maxScore?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
};
export type AttemptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    assessmentVersion?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    maxScore?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttemptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assessmentId?: Prisma.SortOrder;
    assessmentVersion?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    maxScore?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttemptSumOrderByAggregateInput = {
    assessmentVersion?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    maxScore?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
};
export type AttemptScalarRelationFilter = {
    is?: Prisma.AttemptWhereInput;
    isNot?: Prisma.AttemptWhereInput;
};
export type AttemptCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput> | Prisma.AttemptCreateWithoutUserInput[] | Prisma.AttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutUserInput | Prisma.AttemptCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AttemptCreateManyUserInputEnvelope;
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
};
export type AttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput> | Prisma.AttemptCreateWithoutUserInput[] | Prisma.AttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutUserInput | Prisma.AttemptCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AttemptCreateManyUserInputEnvelope;
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
};
export type AttemptUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput> | Prisma.AttemptCreateWithoutUserInput[] | Prisma.AttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutUserInput | Prisma.AttemptCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AttemptUpsertWithWhereUniqueWithoutUserInput | Prisma.AttemptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AttemptCreateManyUserInputEnvelope;
    set?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    disconnect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    delete?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    update?: Prisma.AttemptUpdateWithWhereUniqueWithoutUserInput | Prisma.AttemptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AttemptUpdateManyWithWhereWithoutUserInput | Prisma.AttemptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
};
export type AttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput> | Prisma.AttemptCreateWithoutUserInput[] | Prisma.AttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutUserInput | Prisma.AttemptCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AttemptUpsertWithWhereUniqueWithoutUserInput | Prisma.AttemptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AttemptCreateManyUserInputEnvelope;
    set?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    disconnect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    delete?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    update?: Prisma.AttemptUpdateWithWhereUniqueWithoutUserInput | Prisma.AttemptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AttemptUpdateManyWithWhereWithoutUserInput | Prisma.AttemptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
};
export type AttemptCreateNestedManyWithoutAssessmentInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutAssessmentInput, Prisma.AttemptUncheckedCreateWithoutAssessmentInput> | Prisma.AttemptCreateWithoutAssessmentInput[] | Prisma.AttemptUncheckedCreateWithoutAssessmentInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutAssessmentInput | Prisma.AttemptCreateOrConnectWithoutAssessmentInput[];
    createMany?: Prisma.AttemptCreateManyAssessmentInputEnvelope;
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
};
export type AttemptUncheckedCreateNestedManyWithoutAssessmentInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutAssessmentInput, Prisma.AttemptUncheckedCreateWithoutAssessmentInput> | Prisma.AttemptCreateWithoutAssessmentInput[] | Prisma.AttemptUncheckedCreateWithoutAssessmentInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutAssessmentInput | Prisma.AttemptCreateOrConnectWithoutAssessmentInput[];
    createMany?: Prisma.AttemptCreateManyAssessmentInputEnvelope;
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
};
export type AttemptUpdateManyWithoutAssessmentNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutAssessmentInput, Prisma.AttemptUncheckedCreateWithoutAssessmentInput> | Prisma.AttemptCreateWithoutAssessmentInput[] | Prisma.AttemptUncheckedCreateWithoutAssessmentInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutAssessmentInput | Prisma.AttemptCreateOrConnectWithoutAssessmentInput[];
    upsert?: Prisma.AttemptUpsertWithWhereUniqueWithoutAssessmentInput | Prisma.AttemptUpsertWithWhereUniqueWithoutAssessmentInput[];
    createMany?: Prisma.AttemptCreateManyAssessmentInputEnvelope;
    set?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    disconnect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    delete?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    update?: Prisma.AttemptUpdateWithWhereUniqueWithoutAssessmentInput | Prisma.AttemptUpdateWithWhereUniqueWithoutAssessmentInput[];
    updateMany?: Prisma.AttemptUpdateManyWithWhereWithoutAssessmentInput | Prisma.AttemptUpdateManyWithWhereWithoutAssessmentInput[];
    deleteMany?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
};
export type AttemptUncheckedUpdateManyWithoutAssessmentNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutAssessmentInput, Prisma.AttemptUncheckedCreateWithoutAssessmentInput> | Prisma.AttemptCreateWithoutAssessmentInput[] | Prisma.AttemptUncheckedCreateWithoutAssessmentInput[];
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutAssessmentInput | Prisma.AttemptCreateOrConnectWithoutAssessmentInput[];
    upsert?: Prisma.AttemptUpsertWithWhereUniqueWithoutAssessmentInput | Prisma.AttemptUpsertWithWhereUniqueWithoutAssessmentInput[];
    createMany?: Prisma.AttemptCreateManyAssessmentInputEnvelope;
    set?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    disconnect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    delete?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    connect?: Prisma.AttemptWhereUniqueInput | Prisma.AttemptWhereUniqueInput[];
    update?: Prisma.AttemptUpdateWithWhereUniqueWithoutAssessmentInput | Prisma.AttemptUpdateWithWhereUniqueWithoutAssessmentInput[];
    updateMany?: Prisma.AttemptUpdateManyWithWhereWithoutAssessmentInput | Prisma.AttemptUpdateManyWithWhereWithoutAssessmentInput[];
    deleteMany?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
};
export type EnumAttemptStatusFieldUpdateOperationsInput = {
    set?: $Enums.AttemptStatus;
};
export type AttemptCreateNestedOneWithoutAnswersInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutAnswersInput, Prisma.AttemptUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutAnswersInput;
    connect?: Prisma.AttemptWhereUniqueInput;
};
export type AttemptUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: Prisma.XOR<Prisma.AttemptCreateWithoutAnswersInput, Prisma.AttemptUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.AttemptCreateOrConnectWithoutAnswersInput;
    upsert?: Prisma.AttemptUpsertWithoutAnswersInput;
    connect?: Prisma.AttemptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AttemptUpdateToOneWithWhereWithoutAnswersInput, Prisma.AttemptUpdateWithoutAnswersInput>, Prisma.AttemptUncheckedUpdateWithoutAnswersInput>;
};
export type AttemptCreateWithoutUserInput = {
    id?: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
    assessment: Prisma.AssessmentCreateNestedOneWithoutAttemptsInput;
    answers?: Prisma.AttemptAnswerCreateNestedManyWithoutAttemptInput;
};
export type AttemptUncheckedCreateWithoutUserInput = {
    id?: string;
    assessmentId: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
    answers?: Prisma.AttemptAnswerUncheckedCreateNestedManyWithoutAttemptInput;
};
export type AttemptCreateOrConnectWithoutUserInput = {
    where: Prisma.AttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput>;
};
export type AttemptCreateManyUserInputEnvelope = {
    data: Prisma.AttemptCreateManyUserInput | Prisma.AttemptCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AttemptWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttemptUpdateWithoutUserInput, Prisma.AttemptUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutUserInput, Prisma.AttemptUncheckedCreateWithoutUserInput>;
};
export type AttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AttemptWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttemptUpdateWithoutUserInput, Prisma.AttemptUncheckedUpdateWithoutUserInput>;
};
export type AttemptUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AttemptScalarWhereInput;
    data: Prisma.XOR<Prisma.AttemptUpdateManyMutationInput, Prisma.AttemptUncheckedUpdateManyWithoutUserInput>;
};
export type AttemptScalarWhereInput = {
    AND?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
    OR?: Prisma.AttemptScalarWhereInput[];
    NOT?: Prisma.AttemptScalarWhereInput | Prisma.AttemptScalarWhereInput[];
    id?: Prisma.UuidFilter<"Attempt"> | string;
    userId?: Prisma.UuidFilter<"Attempt"> | string;
    assessmentId?: Prisma.UuidFilter<"Attempt"> | string;
    assessmentVersion?: Prisma.IntFilter<"Attempt"> | number;
    clientId?: Prisma.UuidFilter<"Attempt"> | string;
    status?: Prisma.EnumAttemptStatusFilter<"Attempt"> | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
    submittedAt?: Prisma.DateTimeNullableFilter<"Attempt"> | Date | string | null;
    score?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    maxScore?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    durationSeconds?: Prisma.IntNullableFilter<"Attempt"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Attempt"> | Date | string;
};
export type AttemptCreateWithoutAssessmentInput = {
    id?: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAttemptsInput;
    answers?: Prisma.AttemptAnswerCreateNestedManyWithoutAttemptInput;
};
export type AttemptUncheckedCreateWithoutAssessmentInput = {
    id?: string;
    userId: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
    answers?: Prisma.AttemptAnswerUncheckedCreateNestedManyWithoutAttemptInput;
};
export type AttemptCreateOrConnectWithoutAssessmentInput = {
    where: Prisma.AttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutAssessmentInput, Prisma.AttemptUncheckedCreateWithoutAssessmentInput>;
};
export type AttemptCreateManyAssessmentInputEnvelope = {
    data: Prisma.AttemptCreateManyAssessmentInput | Prisma.AttemptCreateManyAssessmentInput[];
    skipDuplicates?: boolean;
};
export type AttemptUpsertWithWhereUniqueWithoutAssessmentInput = {
    where: Prisma.AttemptWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttemptUpdateWithoutAssessmentInput, Prisma.AttemptUncheckedUpdateWithoutAssessmentInput>;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutAssessmentInput, Prisma.AttemptUncheckedCreateWithoutAssessmentInput>;
};
export type AttemptUpdateWithWhereUniqueWithoutAssessmentInput = {
    where: Prisma.AttemptWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttemptUpdateWithoutAssessmentInput, Prisma.AttemptUncheckedUpdateWithoutAssessmentInput>;
};
export type AttemptUpdateManyWithWhereWithoutAssessmentInput = {
    where: Prisma.AttemptScalarWhereInput;
    data: Prisma.XOR<Prisma.AttemptUpdateManyMutationInput, Prisma.AttemptUncheckedUpdateManyWithoutAssessmentInput>;
};
export type AttemptCreateWithoutAnswersInput = {
    id?: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAttemptsInput;
    assessment: Prisma.AssessmentCreateNestedOneWithoutAttemptsInput;
};
export type AttemptUncheckedCreateWithoutAnswersInput = {
    id?: string;
    userId: string;
    assessmentId: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
};
export type AttemptCreateOrConnectWithoutAnswersInput = {
    where: Prisma.AttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutAnswersInput, Prisma.AttemptUncheckedCreateWithoutAnswersInput>;
};
export type AttemptUpsertWithoutAnswersInput = {
    update: Prisma.XOR<Prisma.AttemptUpdateWithoutAnswersInput, Prisma.AttemptUncheckedUpdateWithoutAnswersInput>;
    create: Prisma.XOR<Prisma.AttemptCreateWithoutAnswersInput, Prisma.AttemptUncheckedCreateWithoutAnswersInput>;
    where?: Prisma.AttemptWhereInput;
};
export type AttemptUpdateToOneWithWhereWithoutAnswersInput = {
    where?: Prisma.AttemptWhereInput;
    data: Prisma.XOR<Prisma.AttemptUpdateWithoutAnswersInput, Prisma.AttemptUncheckedUpdateWithoutAnswersInput>;
};
export type AttemptUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAttemptsNestedInput;
    assessment?: Prisma.AssessmentUpdateOneRequiredWithoutAttemptsNestedInput;
};
export type AttemptUncheckedUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptCreateManyUserInput = {
    id?: string;
    assessmentId: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
};
export type AttemptUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assessment?: Prisma.AssessmentUpdateOneRequiredWithoutAttemptsNestedInput;
    answers?: Prisma.AttemptAnswerUpdateManyWithoutAttemptNestedInput;
};
export type AttemptUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.AttemptAnswerUncheckedUpdateManyWithoutAttemptNestedInput;
};
export type AttemptUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptCreateManyAssessmentInput = {
    id?: string;
    userId: string;
    assessmentVersion: number;
    clientId: string;
    status?: $Enums.AttemptStatus;
    startedAt: Date | string;
    submittedAt?: Date | string | null;
    score?: number | null;
    maxScore?: number | null;
    durationSeconds?: number | null;
    createdAt?: Date | string;
};
export type AttemptUpdateWithoutAssessmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAttemptsNestedInput;
    answers?: Prisma.AttemptAnswerUpdateManyWithoutAttemptNestedInput;
};
export type AttemptUncheckedUpdateWithoutAssessmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.AttemptAnswerUncheckedUpdateManyWithoutAttemptNestedInput;
};
export type AttemptUncheckedUpdateManyWithoutAssessmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    assessmentVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAttemptStatusFieldUpdateOperationsInput | $Enums.AttemptStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    submittedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maxScore?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttemptCountOutputType = {
    answers: number;
};
export type AttemptCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    answers?: boolean | AttemptCountOutputTypeCountAnswersArgs;
};
export type AttemptCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptCountOutputTypeSelect<ExtArgs> | null;
};
export type AttemptCountOutputTypeCountAnswersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptAnswerWhereInput;
};
export type AttemptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    assessmentId?: boolean;
    assessmentVersion?: boolean;
    clientId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    submittedAt?: boolean;
    score?: boolean;
    maxScore?: boolean;
    durationSeconds?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
    answers?: boolean | Prisma.Attempt$answersArgs<ExtArgs>;
    _count?: boolean | Prisma.AttemptCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attempt"]>;
export type AttemptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    assessmentId?: boolean;
    assessmentVersion?: boolean;
    clientId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    submittedAt?: boolean;
    score?: boolean;
    maxScore?: boolean;
    durationSeconds?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attempt"]>;
export type AttemptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    assessmentId?: boolean;
    assessmentVersion?: boolean;
    clientId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    submittedAt?: boolean;
    score?: boolean;
    maxScore?: boolean;
    durationSeconds?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attempt"]>;
export type AttemptSelectScalar = {
    id?: boolean;
    userId?: boolean;
    assessmentId?: boolean;
    assessmentVersion?: boolean;
    clientId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    submittedAt?: boolean;
    score?: boolean;
    maxScore?: boolean;
    durationSeconds?: boolean;
    createdAt?: boolean;
};
export type AttemptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "assessmentId" | "assessmentVersion" | "clientId" | "status" | "startedAt" | "submittedAt" | "score" | "maxScore" | "durationSeconds" | "createdAt", ExtArgs["result"]["attempt"]>;
export type AttemptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
    answers?: boolean | Prisma.Attempt$answersArgs<ExtArgs>;
    _count?: boolean | Prisma.AttemptCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AttemptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
};
export type AttemptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assessment?: boolean | Prisma.AssessmentDefaultArgs<ExtArgs>;
};
export type $AttemptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Attempt";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        assessment: Prisma.$AssessmentPayload<ExtArgs>;
        answers: Prisma.$AttemptAnswerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        assessmentId: string;
        assessmentVersion: number;
        clientId: string;
        status: $Enums.AttemptStatus;
        startedAt: Date;
        submittedAt: Date | null;
        score: number | null;
        maxScore: number | null;
        durationSeconds: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["attempt"]>;
    composites: {};
};
export type AttemptGetPayload<S extends boolean | null | undefined | AttemptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AttemptPayload, S>;
export type AttemptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AttemptCountAggregateInputType | true;
};
export interface AttemptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Attempt'];
        meta: {
            name: 'Attempt';
        };
    };
    findUnique<T extends AttemptFindUniqueArgs>(args: Prisma.SelectSubset<T, AttemptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AttemptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AttemptFindFirstArgs>(args?: Prisma.SelectSubset<T, AttemptFindFirstArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AttemptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AttemptFindManyArgs>(args?: Prisma.SelectSubset<T, AttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AttemptCreateArgs>(args: Prisma.SelectSubset<T, AttemptCreateArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AttemptCreateManyArgs>(args?: Prisma.SelectSubset<T, AttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AttemptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AttemptDeleteArgs>(args: Prisma.SelectSubset<T, AttemptDeleteArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AttemptUpdateArgs>(args: Prisma.SelectSubset<T, AttemptUpdateArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AttemptDeleteManyArgs>(args?: Prisma.SelectSubset<T, AttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AttemptUpdateManyArgs>(args: Prisma.SelectSubset<T, AttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AttemptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AttemptUpsertArgs>(args: Prisma.SelectSubset<T, AttemptUpsertArgs<ExtArgs>>): Prisma.Prisma__AttemptClient<runtime.Types.Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AttemptCountArgs>(args?: Prisma.Subset<T, AttemptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AttemptCountAggregateOutputType> : number>;
    aggregate<T extends AttemptAggregateArgs>(args: Prisma.Subset<T, AttemptAggregateArgs>): Prisma.PrismaPromise<GetAttemptAggregateType<T>>;
    groupBy<T extends AttemptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AttemptGroupByArgs['orderBy'];
    } : {
        orderBy?: AttemptGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AttemptFieldRefs;
}
export interface Prisma__AttemptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assessment<T extends Prisma.AssessmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssessmentDefaultArgs<ExtArgs>>): Prisma.Prisma__AssessmentClient<runtime.Types.Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    answers<T extends Prisma.Attempt$answersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Attempt$answersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttemptAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AttemptFieldRefs {
    readonly id: Prisma.FieldRef<"Attempt", 'String'>;
    readonly userId: Prisma.FieldRef<"Attempt", 'String'>;
    readonly assessmentId: Prisma.FieldRef<"Attempt", 'String'>;
    readonly assessmentVersion: Prisma.FieldRef<"Attempt", 'Int'>;
    readonly clientId: Prisma.FieldRef<"Attempt", 'String'>;
    readonly status: Prisma.FieldRef<"Attempt", 'AttemptStatus'>;
    readonly startedAt: Prisma.FieldRef<"Attempt", 'DateTime'>;
    readonly submittedAt: Prisma.FieldRef<"Attempt", 'DateTime'>;
    readonly score: Prisma.FieldRef<"Attempt", 'Int'>;
    readonly maxScore: Prisma.FieldRef<"Attempt", 'Int'>;
    readonly durationSeconds: Prisma.FieldRef<"Attempt", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Attempt", 'DateTime'>;
}
export type AttemptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where: Prisma.AttemptWhereUniqueInput;
};
export type AttemptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where: Prisma.AttemptWhereUniqueInput;
};
export type AttemptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptScalarFieldEnum | Prisma.AttemptScalarFieldEnum[];
};
export type AttemptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptScalarFieldEnum | Prisma.AttemptScalarFieldEnum[];
};
export type AttemptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where?: Prisma.AttemptWhereInput;
    orderBy?: Prisma.AttemptOrderByWithRelationInput | Prisma.AttemptOrderByWithRelationInput[];
    cursor?: Prisma.AttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptScalarFieldEnum | Prisma.AttemptScalarFieldEnum[];
};
export type AttemptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptCreateInput, Prisma.AttemptUncheckedCreateInput>;
};
export type AttemptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AttemptCreateManyInput | Prisma.AttemptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AttemptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    data: Prisma.AttemptCreateManyInput | Prisma.AttemptCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AttemptIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AttemptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptUpdateInput, Prisma.AttemptUncheckedUpdateInput>;
    where: Prisma.AttemptWhereUniqueInput;
};
export type AttemptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AttemptUpdateManyMutationInput, Prisma.AttemptUncheckedUpdateManyInput>;
    where?: Prisma.AttemptWhereInput;
    limit?: number;
};
export type AttemptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttemptUpdateManyMutationInput, Prisma.AttemptUncheckedUpdateManyInput>;
    where?: Prisma.AttemptWhereInput;
    limit?: number;
    include?: Prisma.AttemptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AttemptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where: Prisma.AttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttemptCreateInput, Prisma.AttemptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AttemptUpdateInput, Prisma.AttemptUncheckedUpdateInput>;
};
export type AttemptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
    where: Prisma.AttemptWhereUniqueInput;
};
export type AttemptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttemptWhereInput;
    limit?: number;
};
export type Attempt$answersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptAnswerSelect<ExtArgs> | null;
    omit?: Prisma.AttemptAnswerOmit<ExtArgs> | null;
    include?: Prisma.AttemptAnswerInclude<ExtArgs> | null;
    where?: Prisma.AttemptAnswerWhereInput;
    orderBy?: Prisma.AttemptAnswerOrderByWithRelationInput | Prisma.AttemptAnswerOrderByWithRelationInput[];
    cursor?: Prisma.AttemptAnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttemptAnswerScalarFieldEnum | Prisma.AttemptAnswerScalarFieldEnum[];
};
export type AttemptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttemptSelect<ExtArgs> | null;
    omit?: Prisma.AttemptOmit<ExtArgs> | null;
    include?: Prisma.AttemptInclude<ExtArgs> | null;
};
