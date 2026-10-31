import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TeacherAssignmentModel = runtime.Types.Result.DefaultSelection<Prisma.$TeacherAssignmentPayload>;
export type AggregateTeacherAssignment = {
    _count: TeacherAssignmentCountAggregateOutputType | null;
    _min: TeacherAssignmentMinAggregateOutputType | null;
    _max: TeacherAssignmentMaxAggregateOutputType | null;
};
export type TeacherAssignmentMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    classSubjectId: string | null;
    createdAt: Date | null;
};
export type TeacherAssignmentMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    classSubjectId: string | null;
    createdAt: Date | null;
};
export type TeacherAssignmentCountAggregateOutputType = {
    id: number;
    userId: number;
    classSubjectId: number;
    createdAt: number;
    _all: number;
};
export type TeacherAssignmentMinAggregateInputType = {
    id?: true;
    userId?: true;
    classSubjectId?: true;
    createdAt?: true;
};
export type TeacherAssignmentMaxAggregateInputType = {
    id?: true;
    userId?: true;
    classSubjectId?: true;
    createdAt?: true;
};
export type TeacherAssignmentCountAggregateInputType = {
    id?: true;
    userId?: true;
    classSubjectId?: true;
    createdAt?: true;
    _all?: true;
};
export type TeacherAssignmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeacherAssignmentWhereInput;
    orderBy?: Prisma.TeacherAssignmentOrderByWithRelationInput | Prisma.TeacherAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.TeacherAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TeacherAssignmentCountAggregateInputType;
    _min?: TeacherAssignmentMinAggregateInputType;
    _max?: TeacherAssignmentMaxAggregateInputType;
};
export type GetTeacherAssignmentAggregateType<T extends TeacherAssignmentAggregateArgs> = {
    [P in keyof T & keyof AggregateTeacherAssignment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTeacherAssignment[P]> : Prisma.GetScalarType<T[P], AggregateTeacherAssignment[P]>;
};
export type TeacherAssignmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeacherAssignmentWhereInput;
    orderBy?: Prisma.TeacherAssignmentOrderByWithAggregationInput | Prisma.TeacherAssignmentOrderByWithAggregationInput[];
    by: Prisma.TeacherAssignmentScalarFieldEnum[] | Prisma.TeacherAssignmentScalarFieldEnum;
    having?: Prisma.TeacherAssignmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TeacherAssignmentCountAggregateInputType | true;
    _min?: TeacherAssignmentMinAggregateInputType;
    _max?: TeacherAssignmentMaxAggregateInputType;
};
export type TeacherAssignmentGroupByOutputType = {
    id: string;
    userId: string;
    classSubjectId: string;
    createdAt: Date;
    _count: TeacherAssignmentCountAggregateOutputType | null;
    _min: TeacherAssignmentMinAggregateOutputType | null;
    _max: TeacherAssignmentMaxAggregateOutputType | null;
};
export type GetTeacherAssignmentGroupByPayload<T extends TeacherAssignmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TeacherAssignmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TeacherAssignmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TeacherAssignmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TeacherAssignmentGroupByOutputType[P]>;
}>>;
export type TeacherAssignmentWhereInput = {
    AND?: Prisma.TeacherAssignmentWhereInput | Prisma.TeacherAssignmentWhereInput[];
    OR?: Prisma.TeacherAssignmentWhereInput[];
    NOT?: Prisma.TeacherAssignmentWhereInput | Prisma.TeacherAssignmentWhereInput[];
    id?: Prisma.UuidFilter<"TeacherAssignment"> | string;
    userId?: Prisma.UuidFilter<"TeacherAssignment"> | string;
    classSubjectId?: Prisma.UuidFilter<"TeacherAssignment"> | string;
    createdAt?: Prisma.DateTimeFilter<"TeacherAssignment"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    classSubject?: Prisma.XOR<Prisma.ClassSubjectScalarRelationFilter, Prisma.ClassSubjectWhereInput>;
};
export type TeacherAssignmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    classSubject?: Prisma.ClassSubjectOrderByWithRelationInput;
};
export type TeacherAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_classSubjectId?: Prisma.TeacherAssignmentUserIdClassSubjectIdCompoundUniqueInput;
    AND?: Prisma.TeacherAssignmentWhereInput | Prisma.TeacherAssignmentWhereInput[];
    OR?: Prisma.TeacherAssignmentWhereInput[];
    NOT?: Prisma.TeacherAssignmentWhereInput | Prisma.TeacherAssignmentWhereInput[];
    userId?: Prisma.UuidFilter<"TeacherAssignment"> | string;
    classSubjectId?: Prisma.UuidFilter<"TeacherAssignment"> | string;
    createdAt?: Prisma.DateTimeFilter<"TeacherAssignment"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    classSubject?: Prisma.XOR<Prisma.ClassSubjectScalarRelationFilter, Prisma.ClassSubjectWhereInput>;
}, "id" | "userId_classSubjectId">;
export type TeacherAssignmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TeacherAssignmentCountOrderByAggregateInput;
    _max?: Prisma.TeacherAssignmentMaxOrderByAggregateInput;
    _min?: Prisma.TeacherAssignmentMinOrderByAggregateInput;
};
export type TeacherAssignmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.TeacherAssignmentScalarWhereWithAggregatesInput | Prisma.TeacherAssignmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.TeacherAssignmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TeacherAssignmentScalarWhereWithAggregatesInput | Prisma.TeacherAssignmentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"TeacherAssignment"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"TeacherAssignment"> | string;
    classSubjectId?: Prisma.UuidWithAggregatesFilter<"TeacherAssignment"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TeacherAssignment"> | Date | string;
};
export type TeacherAssignmentCreateInput = {
    id?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTeacherAssignmentsInput;
    classSubject: Prisma.ClassSubjectCreateNestedOneWithoutTeachersInput;
};
export type TeacherAssignmentUncheckedCreateInput = {
    id?: string;
    userId: string;
    classSubjectId: string;
    createdAt?: Date | string;
};
export type TeacherAssignmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTeacherAssignmentsNestedInput;
    classSubject?: Prisma.ClassSubjectUpdateOneRequiredWithoutTeachersNestedInput;
};
export type TeacherAssignmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeacherAssignmentCreateManyInput = {
    id?: string;
    userId: string;
    classSubjectId: string;
    createdAt?: Date | string;
};
export type TeacherAssignmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeacherAssignmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeacherAssignmentListRelationFilter = {
    every?: Prisma.TeacherAssignmentWhereInput;
    some?: Prisma.TeacherAssignmentWhereInput;
    none?: Prisma.TeacherAssignmentWhereInput;
};
export type TeacherAssignmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TeacherAssignmentUserIdClassSubjectIdCompoundUniqueInput = {
    userId: string;
    classSubjectId: string;
};
export type TeacherAssignmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TeacherAssignmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TeacherAssignmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TeacherAssignmentCreateNestedManyWithoutClassSubjectInput = {
    create?: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutClassSubjectInput, Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput> | Prisma.TeacherAssignmentCreateWithoutClassSubjectInput[] | Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.TeacherAssignmentCreateOrConnectWithoutClassSubjectInput | Prisma.TeacherAssignmentCreateOrConnectWithoutClassSubjectInput[];
    createMany?: Prisma.TeacherAssignmentCreateManyClassSubjectInputEnvelope;
    connect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
};
export type TeacherAssignmentUncheckedCreateNestedManyWithoutClassSubjectInput = {
    create?: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutClassSubjectInput, Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput> | Prisma.TeacherAssignmentCreateWithoutClassSubjectInput[] | Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.TeacherAssignmentCreateOrConnectWithoutClassSubjectInput | Prisma.TeacherAssignmentCreateOrConnectWithoutClassSubjectInput[];
    createMany?: Prisma.TeacherAssignmentCreateManyClassSubjectInputEnvelope;
    connect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
};
export type TeacherAssignmentUpdateManyWithoutClassSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutClassSubjectInput, Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput> | Prisma.TeacherAssignmentCreateWithoutClassSubjectInput[] | Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.TeacherAssignmentCreateOrConnectWithoutClassSubjectInput | Prisma.TeacherAssignmentCreateOrConnectWithoutClassSubjectInput[];
    upsert?: Prisma.TeacherAssignmentUpsertWithWhereUniqueWithoutClassSubjectInput | Prisma.TeacherAssignmentUpsertWithWhereUniqueWithoutClassSubjectInput[];
    createMany?: Prisma.TeacherAssignmentCreateManyClassSubjectInputEnvelope;
    set?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    disconnect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    delete?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    connect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    update?: Prisma.TeacherAssignmentUpdateWithWhereUniqueWithoutClassSubjectInput | Prisma.TeacherAssignmentUpdateWithWhereUniqueWithoutClassSubjectInput[];
    updateMany?: Prisma.TeacherAssignmentUpdateManyWithWhereWithoutClassSubjectInput | Prisma.TeacherAssignmentUpdateManyWithWhereWithoutClassSubjectInput[];
    deleteMany?: Prisma.TeacherAssignmentScalarWhereInput | Prisma.TeacherAssignmentScalarWhereInput[];
};
export type TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutClassSubjectInput, Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput> | Prisma.TeacherAssignmentCreateWithoutClassSubjectInput[] | Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.TeacherAssignmentCreateOrConnectWithoutClassSubjectInput | Prisma.TeacherAssignmentCreateOrConnectWithoutClassSubjectInput[];
    upsert?: Prisma.TeacherAssignmentUpsertWithWhereUniqueWithoutClassSubjectInput | Prisma.TeacherAssignmentUpsertWithWhereUniqueWithoutClassSubjectInput[];
    createMany?: Prisma.TeacherAssignmentCreateManyClassSubjectInputEnvelope;
    set?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    disconnect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    delete?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    connect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    update?: Prisma.TeacherAssignmentUpdateWithWhereUniqueWithoutClassSubjectInput | Prisma.TeacherAssignmentUpdateWithWhereUniqueWithoutClassSubjectInput[];
    updateMany?: Prisma.TeacherAssignmentUpdateManyWithWhereWithoutClassSubjectInput | Prisma.TeacherAssignmentUpdateManyWithWhereWithoutClassSubjectInput[];
    deleteMany?: Prisma.TeacherAssignmentScalarWhereInput | Prisma.TeacherAssignmentScalarWhereInput[];
};
export type TeacherAssignmentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutUserInput, Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput> | Prisma.TeacherAssignmentCreateWithoutUserInput[] | Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TeacherAssignmentCreateOrConnectWithoutUserInput | Prisma.TeacherAssignmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TeacherAssignmentCreateManyUserInputEnvelope;
    connect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
};
export type TeacherAssignmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutUserInput, Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput> | Prisma.TeacherAssignmentCreateWithoutUserInput[] | Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TeacherAssignmentCreateOrConnectWithoutUserInput | Prisma.TeacherAssignmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TeacherAssignmentCreateManyUserInputEnvelope;
    connect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
};
export type TeacherAssignmentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutUserInput, Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput> | Prisma.TeacherAssignmentCreateWithoutUserInput[] | Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TeacherAssignmentCreateOrConnectWithoutUserInput | Prisma.TeacherAssignmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TeacherAssignmentUpsertWithWhereUniqueWithoutUserInput | Prisma.TeacherAssignmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TeacherAssignmentCreateManyUserInputEnvelope;
    set?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    disconnect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    delete?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    connect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    update?: Prisma.TeacherAssignmentUpdateWithWhereUniqueWithoutUserInput | Prisma.TeacherAssignmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TeacherAssignmentUpdateManyWithWhereWithoutUserInput | Prisma.TeacherAssignmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TeacherAssignmentScalarWhereInput | Prisma.TeacherAssignmentScalarWhereInput[];
};
export type TeacherAssignmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutUserInput, Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput> | Prisma.TeacherAssignmentCreateWithoutUserInput[] | Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TeacherAssignmentCreateOrConnectWithoutUserInput | Prisma.TeacherAssignmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TeacherAssignmentUpsertWithWhereUniqueWithoutUserInput | Prisma.TeacherAssignmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TeacherAssignmentCreateManyUserInputEnvelope;
    set?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    disconnect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    delete?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    connect?: Prisma.TeacherAssignmentWhereUniqueInput | Prisma.TeacherAssignmentWhereUniqueInput[];
    update?: Prisma.TeacherAssignmentUpdateWithWhereUniqueWithoutUserInput | Prisma.TeacherAssignmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TeacherAssignmentUpdateManyWithWhereWithoutUserInput | Prisma.TeacherAssignmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TeacherAssignmentScalarWhereInput | Prisma.TeacherAssignmentScalarWhereInput[];
};
export type TeacherAssignmentCreateWithoutClassSubjectInput = {
    id?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTeacherAssignmentsInput;
};
export type TeacherAssignmentUncheckedCreateWithoutClassSubjectInput = {
    id?: string;
    userId: string;
    createdAt?: Date | string;
};
export type TeacherAssignmentCreateOrConnectWithoutClassSubjectInput = {
    where: Prisma.TeacherAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutClassSubjectInput, Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput>;
};
export type TeacherAssignmentCreateManyClassSubjectInputEnvelope = {
    data: Prisma.TeacherAssignmentCreateManyClassSubjectInput | Prisma.TeacherAssignmentCreateManyClassSubjectInput[];
    skipDuplicates?: boolean;
};
export type TeacherAssignmentUpsertWithWhereUniqueWithoutClassSubjectInput = {
    where: Prisma.TeacherAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.TeacherAssignmentUpdateWithoutClassSubjectInput, Prisma.TeacherAssignmentUncheckedUpdateWithoutClassSubjectInput>;
    create: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutClassSubjectInput, Prisma.TeacherAssignmentUncheckedCreateWithoutClassSubjectInput>;
};
export type TeacherAssignmentUpdateWithWhereUniqueWithoutClassSubjectInput = {
    where: Prisma.TeacherAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.TeacherAssignmentUpdateWithoutClassSubjectInput, Prisma.TeacherAssignmentUncheckedUpdateWithoutClassSubjectInput>;
};
export type TeacherAssignmentUpdateManyWithWhereWithoutClassSubjectInput = {
    where: Prisma.TeacherAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.TeacherAssignmentUpdateManyMutationInput, Prisma.TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectInput>;
};
export type TeacherAssignmentScalarWhereInput = {
    AND?: Prisma.TeacherAssignmentScalarWhereInput | Prisma.TeacherAssignmentScalarWhereInput[];
    OR?: Prisma.TeacherAssignmentScalarWhereInput[];
    NOT?: Prisma.TeacherAssignmentScalarWhereInput | Prisma.TeacherAssignmentScalarWhereInput[];
    id?: Prisma.UuidFilter<"TeacherAssignment"> | string;
    userId?: Prisma.UuidFilter<"TeacherAssignment"> | string;
    classSubjectId?: Prisma.UuidFilter<"TeacherAssignment"> | string;
    createdAt?: Prisma.DateTimeFilter<"TeacherAssignment"> | Date | string;
};
export type TeacherAssignmentCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    classSubject: Prisma.ClassSubjectCreateNestedOneWithoutTeachersInput;
};
export type TeacherAssignmentUncheckedCreateWithoutUserInput = {
    id?: string;
    classSubjectId: string;
    createdAt?: Date | string;
};
export type TeacherAssignmentCreateOrConnectWithoutUserInput = {
    where: Prisma.TeacherAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutUserInput, Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput>;
};
export type TeacherAssignmentCreateManyUserInputEnvelope = {
    data: Prisma.TeacherAssignmentCreateManyUserInput | Prisma.TeacherAssignmentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TeacherAssignmentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TeacherAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.TeacherAssignmentUpdateWithoutUserInput, Prisma.TeacherAssignmentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TeacherAssignmentCreateWithoutUserInput, Prisma.TeacherAssignmentUncheckedCreateWithoutUserInput>;
};
export type TeacherAssignmentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TeacherAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.TeacherAssignmentUpdateWithoutUserInput, Prisma.TeacherAssignmentUncheckedUpdateWithoutUserInput>;
};
export type TeacherAssignmentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TeacherAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.TeacherAssignmentUpdateManyMutationInput, Prisma.TeacherAssignmentUncheckedUpdateManyWithoutUserInput>;
};
export type TeacherAssignmentCreateManyClassSubjectInput = {
    id?: string;
    userId: string;
    createdAt?: Date | string;
};
export type TeacherAssignmentUpdateWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTeacherAssignmentsNestedInput;
};
export type TeacherAssignmentUncheckedUpdateWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeacherAssignmentCreateManyUserInput = {
    id?: string;
    classSubjectId: string;
    createdAt?: Date | string;
};
export type TeacherAssignmentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classSubject?: Prisma.ClassSubjectUpdateOneRequiredWithoutTeachersNestedInput;
};
export type TeacherAssignmentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeacherAssignmentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TeacherAssignmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    classSubjectId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["teacherAssignment"]>;
export type TeacherAssignmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    classSubjectId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["teacherAssignment"]>;
export type TeacherAssignmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    classSubjectId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["teacherAssignment"]>;
export type TeacherAssignmentSelectScalar = {
    id?: boolean;
    userId?: boolean;
    classSubjectId?: boolean;
    createdAt?: boolean;
};
export type TeacherAssignmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "classSubjectId" | "createdAt", ExtArgs["result"]["teacherAssignment"]>;
export type TeacherAssignmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
};
export type TeacherAssignmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
};
export type TeacherAssignmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
};
export type $TeacherAssignmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TeacherAssignment";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        classSubject: Prisma.$ClassSubjectPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        classSubjectId: string;
        createdAt: Date;
    }, ExtArgs["result"]["teacherAssignment"]>;
    composites: {};
};
export type TeacherAssignmentGetPayload<S extends boolean | null | undefined | TeacherAssignmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload, S>;
export type TeacherAssignmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TeacherAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TeacherAssignmentCountAggregateInputType | true;
};
export interface TeacherAssignmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TeacherAssignment'];
        meta: {
            name: 'TeacherAssignment';
        };
    };
    findUnique<T extends TeacherAssignmentFindUniqueArgs>(args: Prisma.SelectSubset<T, TeacherAssignmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TeacherAssignmentClient<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TeacherAssignmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TeacherAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TeacherAssignmentClient<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TeacherAssignmentFindFirstArgs>(args?: Prisma.SelectSubset<T, TeacherAssignmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__TeacherAssignmentClient<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TeacherAssignmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TeacherAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TeacherAssignmentClient<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TeacherAssignmentFindManyArgs>(args?: Prisma.SelectSubset<T, TeacherAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TeacherAssignmentCreateArgs>(args: Prisma.SelectSubset<T, TeacherAssignmentCreateArgs<ExtArgs>>): Prisma.Prisma__TeacherAssignmentClient<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TeacherAssignmentCreateManyArgs>(args?: Prisma.SelectSubset<T, TeacherAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TeacherAssignmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TeacherAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TeacherAssignmentDeleteArgs>(args: Prisma.SelectSubset<T, TeacherAssignmentDeleteArgs<ExtArgs>>): Prisma.Prisma__TeacherAssignmentClient<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TeacherAssignmentUpdateArgs>(args: Prisma.SelectSubset<T, TeacherAssignmentUpdateArgs<ExtArgs>>): Prisma.Prisma__TeacherAssignmentClient<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TeacherAssignmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, TeacherAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TeacherAssignmentUpdateManyArgs>(args: Prisma.SelectSubset<T, TeacherAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TeacherAssignmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TeacherAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TeacherAssignmentUpsertArgs>(args: Prisma.SelectSubset<T, TeacherAssignmentUpsertArgs<ExtArgs>>): Prisma.Prisma__TeacherAssignmentClient<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TeacherAssignmentCountArgs>(args?: Prisma.Subset<T, TeacherAssignmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TeacherAssignmentCountAggregateOutputType> : number>;
    aggregate<T extends TeacherAssignmentAggregateArgs>(args: Prisma.Subset<T, TeacherAssignmentAggregateArgs>): Prisma.PrismaPromise<GetTeacherAssignmentAggregateType<T>>;
    groupBy<T extends TeacherAssignmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TeacherAssignmentGroupByArgs['orderBy'];
    } : {
        orderBy?: TeacherAssignmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TeacherAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TeacherAssignmentFieldRefs;
}
export interface Prisma__TeacherAssignmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    classSubject<T extends Prisma.ClassSubjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassSubjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TeacherAssignmentFieldRefs {
    readonly id: Prisma.FieldRef<"TeacherAssignment", 'String'>;
    readonly userId: Prisma.FieldRef<"TeacherAssignment", 'String'>;
    readonly classSubjectId: Prisma.FieldRef<"TeacherAssignment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TeacherAssignment", 'DateTime'>;
}
export type TeacherAssignmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    where: Prisma.TeacherAssignmentWhereUniqueInput;
};
export type TeacherAssignmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    where: Prisma.TeacherAssignmentWhereUniqueInput;
};
export type TeacherAssignmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    where?: Prisma.TeacherAssignmentWhereInput;
    orderBy?: Prisma.TeacherAssignmentOrderByWithRelationInput | Prisma.TeacherAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.TeacherAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeacherAssignmentScalarFieldEnum | Prisma.TeacherAssignmentScalarFieldEnum[];
};
export type TeacherAssignmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    where?: Prisma.TeacherAssignmentWhereInput;
    orderBy?: Prisma.TeacherAssignmentOrderByWithRelationInput | Prisma.TeacherAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.TeacherAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeacherAssignmentScalarFieldEnum | Prisma.TeacherAssignmentScalarFieldEnum[];
};
export type TeacherAssignmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    where?: Prisma.TeacherAssignmentWhereInput;
    orderBy?: Prisma.TeacherAssignmentOrderByWithRelationInput | Prisma.TeacherAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.TeacherAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeacherAssignmentScalarFieldEnum | Prisma.TeacherAssignmentScalarFieldEnum[];
};
export type TeacherAssignmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TeacherAssignmentCreateInput, Prisma.TeacherAssignmentUncheckedCreateInput>;
};
export type TeacherAssignmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TeacherAssignmentCreateManyInput | Prisma.TeacherAssignmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TeacherAssignmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    data: Prisma.TeacherAssignmentCreateManyInput | Prisma.TeacherAssignmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TeacherAssignmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TeacherAssignmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TeacherAssignmentUpdateInput, Prisma.TeacherAssignmentUncheckedUpdateInput>;
    where: Prisma.TeacherAssignmentWhereUniqueInput;
};
export type TeacherAssignmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TeacherAssignmentUpdateManyMutationInput, Prisma.TeacherAssignmentUncheckedUpdateManyInput>;
    where?: Prisma.TeacherAssignmentWhereInput;
    limit?: number;
};
export type TeacherAssignmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TeacherAssignmentUpdateManyMutationInput, Prisma.TeacherAssignmentUncheckedUpdateManyInput>;
    where?: Prisma.TeacherAssignmentWhereInput;
    limit?: number;
    include?: Prisma.TeacherAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TeacherAssignmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    where: Prisma.TeacherAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.TeacherAssignmentCreateInput, Prisma.TeacherAssignmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TeacherAssignmentUpdateInput, Prisma.TeacherAssignmentUncheckedUpdateInput>;
};
export type TeacherAssignmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
    where: Prisma.TeacherAssignmentWhereUniqueInput;
};
export type TeacherAssignmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeacherAssignmentWhereInput;
    limit?: number;
};
export type TeacherAssignmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TeacherAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.TeacherAssignmentOmit<ExtArgs> | null;
    include?: Prisma.TeacherAssignmentInclude<ExtArgs> | null;
};
