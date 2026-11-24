import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ClassSubjectModel = runtime.Types.Result.DefaultSelection<Prisma.$ClassSubjectPayload>;
export type AggregateClassSubject = {
    _count: ClassSubjectCountAggregateOutputType | null;
    _avg: ClassSubjectAvgAggregateOutputType | null;
    _sum: ClassSubjectSumAggregateOutputType | null;
    _min: ClassSubjectMinAggregateOutputType | null;
    _max: ClassSubjectMaxAggregateOutputType | null;
};
export type ClassSubjectAvgAggregateOutputType = {
    coefficient: number | null;
    position: number | null;
};
export type ClassSubjectSumAggregateOutputType = {
    coefficient: number | null;
    position: number | null;
};
export type ClassSubjectMinAggregateOutputType = {
    id: string | null;
    classId: string | null;
    subjectId: string | null;
    coefficient: number | null;
    position: number | null;
    createdAt: Date | null;
};
export type ClassSubjectMaxAggregateOutputType = {
    id: string | null;
    classId: string | null;
    subjectId: string | null;
    coefficient: number | null;
    position: number | null;
    createdAt: Date | null;
};
export type ClassSubjectCountAggregateOutputType = {
    id: number;
    classId: number;
    subjectId: number;
    coefficient: number;
    position: number;
    createdAt: number;
    _all: number;
};
export type ClassSubjectAvgAggregateInputType = {
    coefficient?: true;
    position?: true;
};
export type ClassSubjectSumAggregateInputType = {
    coefficient?: true;
    position?: true;
};
export type ClassSubjectMinAggregateInputType = {
    id?: true;
    classId?: true;
    subjectId?: true;
    coefficient?: true;
    position?: true;
    createdAt?: true;
};
export type ClassSubjectMaxAggregateInputType = {
    id?: true;
    classId?: true;
    subjectId?: true;
    coefficient?: true;
    position?: true;
    createdAt?: true;
};
export type ClassSubjectCountAggregateInputType = {
    id?: true;
    classId?: true;
    subjectId?: true;
    coefficient?: true;
    position?: true;
    createdAt?: true;
    _all?: true;
};
export type ClassSubjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassSubjectWhereInput;
    orderBy?: Prisma.ClassSubjectOrderByWithRelationInput | Prisma.ClassSubjectOrderByWithRelationInput[];
    cursor?: Prisma.ClassSubjectWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ClassSubjectCountAggregateInputType;
    _avg?: ClassSubjectAvgAggregateInputType;
    _sum?: ClassSubjectSumAggregateInputType;
    _min?: ClassSubjectMinAggregateInputType;
    _max?: ClassSubjectMaxAggregateInputType;
};
export type GetClassSubjectAggregateType<T extends ClassSubjectAggregateArgs> = {
    [P in keyof T & keyof AggregateClassSubject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateClassSubject[P]> : Prisma.GetScalarType<T[P], AggregateClassSubject[P]>;
};
export type ClassSubjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassSubjectWhereInput;
    orderBy?: Prisma.ClassSubjectOrderByWithAggregationInput | Prisma.ClassSubjectOrderByWithAggregationInput[];
    by: Prisma.ClassSubjectScalarFieldEnum[] | Prisma.ClassSubjectScalarFieldEnum;
    having?: Prisma.ClassSubjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClassSubjectCountAggregateInputType | true;
    _avg?: ClassSubjectAvgAggregateInputType;
    _sum?: ClassSubjectSumAggregateInputType;
    _min?: ClassSubjectMinAggregateInputType;
    _max?: ClassSubjectMaxAggregateInputType;
};
export type ClassSubjectGroupByOutputType = {
    id: string;
    classId: string;
    subjectId: string;
    coefficient: number | null;
    position: number;
    createdAt: Date;
    _count: ClassSubjectCountAggregateOutputType | null;
    _avg: ClassSubjectAvgAggregateOutputType | null;
    _sum: ClassSubjectSumAggregateOutputType | null;
    _min: ClassSubjectMinAggregateOutputType | null;
    _max: ClassSubjectMaxAggregateOutputType | null;
};
export type GetClassSubjectGroupByPayload<T extends ClassSubjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClassSubjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClassSubjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClassSubjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClassSubjectGroupByOutputType[P]>;
}>>;
export type ClassSubjectWhereInput = {
    AND?: Prisma.ClassSubjectWhereInput | Prisma.ClassSubjectWhereInput[];
    OR?: Prisma.ClassSubjectWhereInput[];
    NOT?: Prisma.ClassSubjectWhereInput | Prisma.ClassSubjectWhereInput[];
    id?: Prisma.UuidFilter<"ClassSubject"> | string;
    classId?: Prisma.UuidFilter<"ClassSubject"> | string;
    subjectId?: Prisma.UuidFilter<"ClassSubject"> | string;
    coefficient?: Prisma.IntNullableFilter<"ClassSubject"> | number | null;
    position?: Prisma.IntFilter<"ClassSubject"> | number;
    createdAt?: Prisma.DateTimeFilter<"ClassSubject"> | Date | string;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    subject?: Prisma.XOR<Prisma.SubjectScalarRelationFilter, Prisma.SubjectWhereInput>;
    chapters?: Prisma.ChapterListRelationFilter;
    teachers?: Prisma.TeacherAssignmentListRelationFilter;
    contributions?: Prisma.ContributionListRelationFilter;
    forumThreads?: Prisma.ForumThreadListRelationFilter;
};
export type ClassSubjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    coefficient?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    class?: Prisma.ClassOrderByWithRelationInput;
    subject?: Prisma.SubjectOrderByWithRelationInput;
    chapters?: Prisma.ChapterOrderByRelationAggregateInput;
    teachers?: Prisma.TeacherAssignmentOrderByRelationAggregateInput;
    contributions?: Prisma.ContributionOrderByRelationAggregateInput;
    forumThreads?: Prisma.ForumThreadOrderByRelationAggregateInput;
};
export type ClassSubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    classId_subjectId?: Prisma.ClassSubjectClassIdSubjectIdCompoundUniqueInput;
    id_classId?: Prisma.ClassSubjectIdClassIdCompoundUniqueInput;
    AND?: Prisma.ClassSubjectWhereInput | Prisma.ClassSubjectWhereInput[];
    OR?: Prisma.ClassSubjectWhereInput[];
    NOT?: Prisma.ClassSubjectWhereInput | Prisma.ClassSubjectWhereInput[];
    classId?: Prisma.UuidFilter<"ClassSubject"> | string;
    subjectId?: Prisma.UuidFilter<"ClassSubject"> | string;
    coefficient?: Prisma.IntNullableFilter<"ClassSubject"> | number | null;
    position?: Prisma.IntFilter<"ClassSubject"> | number;
    createdAt?: Prisma.DateTimeFilter<"ClassSubject"> | Date | string;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    subject?: Prisma.XOR<Prisma.SubjectScalarRelationFilter, Prisma.SubjectWhereInput>;
    chapters?: Prisma.ChapterListRelationFilter;
    teachers?: Prisma.TeacherAssignmentListRelationFilter;
    contributions?: Prisma.ContributionListRelationFilter;
    forumThreads?: Prisma.ForumThreadListRelationFilter;
}, "id" | "classId_subjectId" | "id_classId">;
export type ClassSubjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    coefficient?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ClassSubjectCountOrderByAggregateInput;
    _avg?: Prisma.ClassSubjectAvgOrderByAggregateInput;
    _max?: Prisma.ClassSubjectMaxOrderByAggregateInput;
    _min?: Prisma.ClassSubjectMinOrderByAggregateInput;
    _sum?: Prisma.ClassSubjectSumOrderByAggregateInput;
};
export type ClassSubjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClassSubjectScalarWhereWithAggregatesInput | Prisma.ClassSubjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClassSubjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClassSubjectScalarWhereWithAggregatesInput | Prisma.ClassSubjectScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ClassSubject"> | string;
    classId?: Prisma.UuidWithAggregatesFilter<"ClassSubject"> | string;
    subjectId?: Prisma.UuidWithAggregatesFilter<"ClassSubject"> | string;
    coefficient?: Prisma.IntNullableWithAggregatesFilter<"ClassSubject"> | number | null;
    position?: Prisma.IntWithAggregatesFilter<"ClassSubject"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ClassSubject"> | Date | string;
};
export type ClassSubjectCreateInput = {
    id?: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutClassSubjectsInput;
    subject: Prisma.SubjectCreateNestedOneWithoutClassSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectUncheckedCreateInput = {
    id?: string;
    classId: string;
    subjectId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentUncheckedCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutClassSubjectsNestedInput;
    subject?: Prisma.SubjectUpdateOneRequiredWithoutClassSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectCreateManyInput = {
    id?: string;
    classId: string;
    subjectId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
};
export type ClassSubjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassSubjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassSubjectListRelationFilter = {
    every?: Prisma.ClassSubjectWhereInput;
    some?: Prisma.ClassSubjectWhereInput;
    none?: Prisma.ClassSubjectWhereInput;
};
export type ClassSubjectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ClassSubjectClassIdSubjectIdCompoundUniqueInput = {
    classId: string;
    subjectId: string;
};
export type ClassSubjectIdClassIdCompoundUniqueInput = {
    id: string;
    classId: string;
};
export type ClassSubjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    coefficient?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassSubjectAvgOrderByAggregateInput = {
    coefficient?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type ClassSubjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    coefficient?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassSubjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    coefficient?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassSubjectSumOrderByAggregateInput = {
    coefficient?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type ClassSubjectScalarRelationFilter = {
    is?: Prisma.ClassSubjectWhereInput;
    isNot?: Prisma.ClassSubjectWhereInput;
};
export type ClassSubjectNullableScalarRelationFilter = {
    is?: Prisma.ClassSubjectWhereInput | null;
    isNot?: Prisma.ClassSubjectWhereInput | null;
};
export type ClassSubjectCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutClassInput, Prisma.ClassSubjectUncheckedCreateWithoutClassInput> | Prisma.ClassSubjectCreateWithoutClassInput[] | Prisma.ClassSubjectUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutClassInput | Prisma.ClassSubjectCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.ClassSubjectCreateManyClassInputEnvelope;
    connect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
};
export type ClassSubjectUncheckedCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutClassInput, Prisma.ClassSubjectUncheckedCreateWithoutClassInput> | Prisma.ClassSubjectCreateWithoutClassInput[] | Prisma.ClassSubjectUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutClassInput | Prisma.ClassSubjectCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.ClassSubjectCreateManyClassInputEnvelope;
    connect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
};
export type ClassSubjectUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutClassInput, Prisma.ClassSubjectUncheckedCreateWithoutClassInput> | Prisma.ClassSubjectCreateWithoutClassInput[] | Prisma.ClassSubjectUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutClassInput | Prisma.ClassSubjectCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.ClassSubjectUpsertWithWhereUniqueWithoutClassInput | Prisma.ClassSubjectUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.ClassSubjectCreateManyClassInputEnvelope;
    set?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    disconnect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    delete?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    connect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    update?: Prisma.ClassSubjectUpdateWithWhereUniqueWithoutClassInput | Prisma.ClassSubjectUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.ClassSubjectUpdateManyWithWhereWithoutClassInput | Prisma.ClassSubjectUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.ClassSubjectScalarWhereInput | Prisma.ClassSubjectScalarWhereInput[];
};
export type ClassSubjectUncheckedUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutClassInput, Prisma.ClassSubjectUncheckedCreateWithoutClassInput> | Prisma.ClassSubjectCreateWithoutClassInput[] | Prisma.ClassSubjectUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutClassInput | Prisma.ClassSubjectCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.ClassSubjectUpsertWithWhereUniqueWithoutClassInput | Prisma.ClassSubjectUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.ClassSubjectCreateManyClassInputEnvelope;
    set?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    disconnect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    delete?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    connect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    update?: Prisma.ClassSubjectUpdateWithWhereUniqueWithoutClassInput | Prisma.ClassSubjectUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.ClassSubjectUpdateManyWithWhereWithoutClassInput | Prisma.ClassSubjectUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.ClassSubjectScalarWhereInput | Prisma.ClassSubjectScalarWhereInput[];
};
export type ClassSubjectCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutSubjectInput, Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput> | Prisma.ClassSubjectCreateWithoutSubjectInput[] | Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutSubjectInput | Prisma.ClassSubjectCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.ClassSubjectCreateManySubjectInputEnvelope;
    connect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
};
export type ClassSubjectUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutSubjectInput, Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput> | Prisma.ClassSubjectCreateWithoutSubjectInput[] | Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutSubjectInput | Prisma.ClassSubjectCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.ClassSubjectCreateManySubjectInputEnvelope;
    connect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
};
export type ClassSubjectUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutSubjectInput, Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput> | Prisma.ClassSubjectCreateWithoutSubjectInput[] | Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutSubjectInput | Prisma.ClassSubjectCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.ClassSubjectUpsertWithWhereUniqueWithoutSubjectInput | Prisma.ClassSubjectUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.ClassSubjectCreateManySubjectInputEnvelope;
    set?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    disconnect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    delete?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    connect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    update?: Prisma.ClassSubjectUpdateWithWhereUniqueWithoutSubjectInput | Prisma.ClassSubjectUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.ClassSubjectUpdateManyWithWhereWithoutSubjectInput | Prisma.ClassSubjectUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.ClassSubjectScalarWhereInput | Prisma.ClassSubjectScalarWhereInput[];
};
export type ClassSubjectUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutSubjectInput, Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput> | Prisma.ClassSubjectCreateWithoutSubjectInput[] | Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutSubjectInput | Prisma.ClassSubjectCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.ClassSubjectUpsertWithWhereUniqueWithoutSubjectInput | Prisma.ClassSubjectUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.ClassSubjectCreateManySubjectInputEnvelope;
    set?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    disconnect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    delete?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    connect?: Prisma.ClassSubjectWhereUniqueInput | Prisma.ClassSubjectWhereUniqueInput[];
    update?: Prisma.ClassSubjectUpdateWithWhereUniqueWithoutSubjectInput | Prisma.ClassSubjectUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.ClassSubjectUpdateManyWithWhereWithoutSubjectInput | Prisma.ClassSubjectUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.ClassSubjectScalarWhereInput | Prisma.ClassSubjectScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ClassSubjectCreateNestedOneWithoutTeachersInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutTeachersInput, Prisma.ClassSubjectUncheckedCreateWithoutTeachersInput>;
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutTeachersInput;
    connect?: Prisma.ClassSubjectWhereUniqueInput;
};
export type ClassSubjectUpdateOneRequiredWithoutTeachersNestedInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutTeachersInput, Prisma.ClassSubjectUncheckedCreateWithoutTeachersInput>;
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutTeachersInput;
    upsert?: Prisma.ClassSubjectUpsertWithoutTeachersInput;
    connect?: Prisma.ClassSubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassSubjectUpdateToOneWithWhereWithoutTeachersInput, Prisma.ClassSubjectUpdateWithoutTeachersInput>, Prisma.ClassSubjectUncheckedUpdateWithoutTeachersInput>;
};
export type ClassSubjectCreateNestedOneWithoutChaptersInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutChaptersInput, Prisma.ClassSubjectUncheckedCreateWithoutChaptersInput>;
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutChaptersInput;
    connect?: Prisma.ClassSubjectWhereUniqueInput;
};
export type ClassSubjectUpdateOneRequiredWithoutChaptersNestedInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutChaptersInput, Prisma.ClassSubjectUncheckedCreateWithoutChaptersInput>;
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutChaptersInput;
    upsert?: Prisma.ClassSubjectUpsertWithoutChaptersInput;
    connect?: Prisma.ClassSubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassSubjectUpdateToOneWithWhereWithoutChaptersInput, Prisma.ClassSubjectUpdateWithoutChaptersInput>, Prisma.ClassSubjectUncheckedUpdateWithoutChaptersInput>;
};
export type ClassSubjectCreateNestedOneWithoutContributionsInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutContributionsInput, Prisma.ClassSubjectUncheckedCreateWithoutContributionsInput>;
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutContributionsInput;
    connect?: Prisma.ClassSubjectWhereUniqueInput;
};
export type ClassSubjectUpdateOneWithoutContributionsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutContributionsInput, Prisma.ClassSubjectUncheckedCreateWithoutContributionsInput>;
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutContributionsInput;
    upsert?: Prisma.ClassSubjectUpsertWithoutContributionsInput;
    disconnect?: Prisma.ClassSubjectWhereInput | boolean;
    delete?: Prisma.ClassSubjectWhereInput | boolean;
    connect?: Prisma.ClassSubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassSubjectUpdateToOneWithWhereWithoutContributionsInput, Prisma.ClassSubjectUpdateWithoutContributionsInput>, Prisma.ClassSubjectUncheckedUpdateWithoutContributionsInput>;
};
export type ClassSubjectCreateNestedOneWithoutForumThreadsInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutForumThreadsInput, Prisma.ClassSubjectUncheckedCreateWithoutForumThreadsInput>;
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutForumThreadsInput;
    connect?: Prisma.ClassSubjectWhereUniqueInput;
};
export type ClassSubjectUpdateOneWithoutForumThreadsNestedInput = {
    create?: Prisma.XOR<Prisma.ClassSubjectCreateWithoutForumThreadsInput, Prisma.ClassSubjectUncheckedCreateWithoutForumThreadsInput>;
    connectOrCreate?: Prisma.ClassSubjectCreateOrConnectWithoutForumThreadsInput;
    upsert?: Prisma.ClassSubjectUpsertWithoutForumThreadsInput;
    disconnect?: Prisma.ClassSubjectWhereInput | boolean;
    delete?: Prisma.ClassSubjectWhereInput | boolean;
    connect?: Prisma.ClassSubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClassSubjectUpdateToOneWithWhereWithoutForumThreadsInput, Prisma.ClassSubjectUpdateWithoutForumThreadsInput>, Prisma.ClassSubjectUncheckedUpdateWithoutForumThreadsInput>;
};
export type ClassSubjectCreateWithoutClassInput = {
    id?: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    subject: Prisma.SubjectCreateNestedOneWithoutClassSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectUncheckedCreateWithoutClassInput = {
    id?: string;
    subjectId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentUncheckedCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectCreateOrConnectWithoutClassInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutClassInput, Prisma.ClassSubjectUncheckedCreateWithoutClassInput>;
};
export type ClassSubjectCreateManyClassInputEnvelope = {
    data: Prisma.ClassSubjectCreateManyClassInput | Prisma.ClassSubjectCreateManyClassInput[];
    skipDuplicates?: boolean;
};
export type ClassSubjectUpsertWithWhereUniqueWithoutClassInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutClassInput, Prisma.ClassSubjectUncheckedUpdateWithoutClassInput>;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutClassInput, Prisma.ClassSubjectUncheckedCreateWithoutClassInput>;
};
export type ClassSubjectUpdateWithWhereUniqueWithoutClassInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutClassInput, Prisma.ClassSubjectUncheckedUpdateWithoutClassInput>;
};
export type ClassSubjectUpdateManyWithWhereWithoutClassInput = {
    where: Prisma.ClassSubjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateManyMutationInput, Prisma.ClassSubjectUncheckedUpdateManyWithoutClassInput>;
};
export type ClassSubjectScalarWhereInput = {
    AND?: Prisma.ClassSubjectScalarWhereInput | Prisma.ClassSubjectScalarWhereInput[];
    OR?: Prisma.ClassSubjectScalarWhereInput[];
    NOT?: Prisma.ClassSubjectScalarWhereInput | Prisma.ClassSubjectScalarWhereInput[];
    id?: Prisma.UuidFilter<"ClassSubject"> | string;
    classId?: Prisma.UuidFilter<"ClassSubject"> | string;
    subjectId?: Prisma.UuidFilter<"ClassSubject"> | string;
    coefficient?: Prisma.IntNullableFilter<"ClassSubject"> | number | null;
    position?: Prisma.IntFilter<"ClassSubject"> | number;
    createdAt?: Prisma.DateTimeFilter<"ClassSubject"> | Date | string;
};
export type ClassSubjectCreateWithoutSubjectInput = {
    id?: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutClassSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectUncheckedCreateWithoutSubjectInput = {
    id?: string;
    classId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentUncheckedCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectCreateOrConnectWithoutSubjectInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutSubjectInput, Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput>;
};
export type ClassSubjectCreateManySubjectInputEnvelope = {
    data: Prisma.ClassSubjectCreateManySubjectInput | Prisma.ClassSubjectCreateManySubjectInput[];
    skipDuplicates?: boolean;
};
export type ClassSubjectUpsertWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutSubjectInput, Prisma.ClassSubjectUncheckedUpdateWithoutSubjectInput>;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutSubjectInput, Prisma.ClassSubjectUncheckedCreateWithoutSubjectInput>;
};
export type ClassSubjectUpdateWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutSubjectInput, Prisma.ClassSubjectUncheckedUpdateWithoutSubjectInput>;
};
export type ClassSubjectUpdateManyWithWhereWithoutSubjectInput = {
    where: Prisma.ClassSubjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateManyMutationInput, Prisma.ClassSubjectUncheckedUpdateManyWithoutSubjectInput>;
};
export type ClassSubjectCreateWithoutTeachersInput = {
    id?: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutClassSubjectsInput;
    subject: Prisma.SubjectCreateNestedOneWithoutClassSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectUncheckedCreateWithoutTeachersInput = {
    id?: string;
    classId: string;
    subjectId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectCreateOrConnectWithoutTeachersInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutTeachersInput, Prisma.ClassSubjectUncheckedCreateWithoutTeachersInput>;
};
export type ClassSubjectUpsertWithoutTeachersInput = {
    update: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutTeachersInput, Prisma.ClassSubjectUncheckedUpdateWithoutTeachersInput>;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutTeachersInput, Prisma.ClassSubjectUncheckedCreateWithoutTeachersInput>;
    where?: Prisma.ClassSubjectWhereInput;
};
export type ClassSubjectUpdateToOneWithWhereWithoutTeachersInput = {
    where?: Prisma.ClassSubjectWhereInput;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutTeachersInput, Prisma.ClassSubjectUncheckedUpdateWithoutTeachersInput>;
};
export type ClassSubjectUpdateWithoutTeachersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutClassSubjectsNestedInput;
    subject?: Prisma.SubjectUpdateOneRequiredWithoutClassSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateWithoutTeachersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectCreateWithoutChaptersInput = {
    id?: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutClassSubjectsInput;
    subject: Prisma.SubjectCreateNestedOneWithoutClassSubjectsInput;
    teachers?: Prisma.TeacherAssignmentCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectUncheckedCreateWithoutChaptersInput = {
    id?: string;
    classId: string;
    subjectId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    teachers?: Prisma.TeacherAssignmentUncheckedCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectCreateOrConnectWithoutChaptersInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutChaptersInput, Prisma.ClassSubjectUncheckedCreateWithoutChaptersInput>;
};
export type ClassSubjectUpsertWithoutChaptersInput = {
    update: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutChaptersInput, Prisma.ClassSubjectUncheckedUpdateWithoutChaptersInput>;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutChaptersInput, Prisma.ClassSubjectUncheckedCreateWithoutChaptersInput>;
    where?: Prisma.ClassSubjectWhereInput;
};
export type ClassSubjectUpdateToOneWithWhereWithoutChaptersInput = {
    where?: Prisma.ClassSubjectWhereInput;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutChaptersInput, Prisma.ClassSubjectUncheckedUpdateWithoutChaptersInput>;
};
export type ClassSubjectUpdateWithoutChaptersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutClassSubjectsNestedInput;
    subject?: Prisma.SubjectUpdateOneRequiredWithoutClassSubjectsNestedInput;
    teachers?: Prisma.TeacherAssignmentUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateWithoutChaptersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teachers?: Prisma.TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectCreateWithoutContributionsInput = {
    id?: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutClassSubjectsInput;
    subject: Prisma.SubjectCreateNestedOneWithoutClassSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectUncheckedCreateWithoutContributionsInput = {
    id?: string;
    classId: string;
    subjectId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentUncheckedCreateNestedManyWithoutClassSubjectInput;
    forumThreads?: Prisma.ForumThreadUncheckedCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectCreateOrConnectWithoutContributionsInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutContributionsInput, Prisma.ClassSubjectUncheckedCreateWithoutContributionsInput>;
};
export type ClassSubjectUpsertWithoutContributionsInput = {
    update: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutContributionsInput, Prisma.ClassSubjectUncheckedUpdateWithoutContributionsInput>;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutContributionsInput, Prisma.ClassSubjectUncheckedCreateWithoutContributionsInput>;
    where?: Prisma.ClassSubjectWhereInput;
};
export type ClassSubjectUpdateToOneWithWhereWithoutContributionsInput = {
    where?: Prisma.ClassSubjectWhereInput;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutContributionsInput, Prisma.ClassSubjectUncheckedUpdateWithoutContributionsInput>;
};
export type ClassSubjectUpdateWithoutContributionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutClassSubjectsNestedInput;
    subject?: Prisma.SubjectUpdateOneRequiredWithoutClassSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateWithoutContributionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectCreateWithoutForumThreadsInput = {
    id?: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutClassSubjectsInput;
    subject: Prisma.SubjectCreateNestedOneWithoutClassSubjectsInput;
    chapters?: Prisma.ChapterCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectUncheckedCreateWithoutForumThreadsInput = {
    id?: string;
    classId: string;
    subjectId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
    chapters?: Prisma.ChapterUncheckedCreateNestedManyWithoutClassSubjectInput;
    teachers?: Prisma.TeacherAssignmentUncheckedCreateNestedManyWithoutClassSubjectInput;
    contributions?: Prisma.ContributionUncheckedCreateNestedManyWithoutClassSubjectInput;
};
export type ClassSubjectCreateOrConnectWithoutForumThreadsInput = {
    where: Prisma.ClassSubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutForumThreadsInput, Prisma.ClassSubjectUncheckedCreateWithoutForumThreadsInput>;
};
export type ClassSubjectUpsertWithoutForumThreadsInput = {
    update: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutForumThreadsInput, Prisma.ClassSubjectUncheckedUpdateWithoutForumThreadsInput>;
    create: Prisma.XOR<Prisma.ClassSubjectCreateWithoutForumThreadsInput, Prisma.ClassSubjectUncheckedCreateWithoutForumThreadsInput>;
    where?: Prisma.ClassSubjectWhereInput;
};
export type ClassSubjectUpdateToOneWithWhereWithoutForumThreadsInput = {
    where?: Prisma.ClassSubjectWhereInput;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateWithoutForumThreadsInput, Prisma.ClassSubjectUncheckedUpdateWithoutForumThreadsInput>;
};
export type ClassSubjectUpdateWithoutForumThreadsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutClassSubjectsNestedInput;
    subject?: Prisma.SubjectUpdateOneRequiredWithoutClassSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateWithoutForumThreadsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectCreateManyClassInput = {
    id?: string;
    subjectId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
};
export type ClassSubjectUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subject?: Prisma.SubjectUpdateOneRequiredWithoutClassSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateManyWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassSubjectCreateManySubjectInput = {
    id?: string;
    classId: string;
    coefficient?: number | null;
    position?: number;
    createdAt?: Date | string;
};
export type ClassSubjectUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutClassSubjectsNestedInput;
    chapters?: Prisma.ChapterUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    chapters?: Prisma.ChapterUncheckedUpdateManyWithoutClassSubjectNestedInput;
    teachers?: Prisma.TeacherAssignmentUncheckedUpdateManyWithoutClassSubjectNestedInput;
    contributions?: Prisma.ContributionUncheckedUpdateManyWithoutClassSubjectNestedInput;
    forumThreads?: Prisma.ForumThreadUncheckedUpdateManyWithoutClassSubjectNestedInput;
};
export type ClassSubjectUncheckedUpdateManyWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    coefficient?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassSubjectCountOutputType = {
    chapters: number;
    teachers: number;
    contributions: number;
    forumThreads: number;
};
export type ClassSubjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chapters?: boolean | ClassSubjectCountOutputTypeCountChaptersArgs;
    teachers?: boolean | ClassSubjectCountOutputTypeCountTeachersArgs;
    contributions?: boolean | ClassSubjectCountOutputTypeCountContributionsArgs;
    forumThreads?: boolean | ClassSubjectCountOutputTypeCountForumThreadsArgs;
};
export type ClassSubjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectCountOutputTypeSelect<ExtArgs> | null;
};
export type ClassSubjectCountOutputTypeCountChaptersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChapterWhereInput;
};
export type ClassSubjectCountOutputTypeCountTeachersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeacherAssignmentWhereInput;
};
export type ClassSubjectCountOutputTypeCountContributionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContributionWhereInput;
};
export type ClassSubjectCountOutputTypeCountForumThreadsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumThreadWhereInput;
};
export type ClassSubjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    subjectId?: boolean;
    coefficient?: boolean;
    position?: boolean;
    createdAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
    chapters?: boolean | Prisma.ClassSubject$chaptersArgs<ExtArgs>;
    teachers?: boolean | Prisma.ClassSubject$teachersArgs<ExtArgs>;
    contributions?: boolean | Prisma.ClassSubject$contributionsArgs<ExtArgs>;
    forumThreads?: boolean | Prisma.ClassSubject$forumThreadsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClassSubjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["classSubject"]>;
export type ClassSubjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    subjectId?: boolean;
    coefficient?: boolean;
    position?: boolean;
    createdAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["classSubject"]>;
export type ClassSubjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    subjectId?: boolean;
    coefficient?: boolean;
    position?: boolean;
    createdAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["classSubject"]>;
export type ClassSubjectSelectScalar = {
    id?: boolean;
    classId?: boolean;
    subjectId?: boolean;
    coefficient?: boolean;
    position?: boolean;
    createdAt?: boolean;
};
export type ClassSubjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "classId" | "subjectId" | "coefficient" | "position" | "createdAt", ExtArgs["result"]["classSubject"]>;
export type ClassSubjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
    chapters?: boolean | Prisma.ClassSubject$chaptersArgs<ExtArgs>;
    teachers?: boolean | Prisma.ClassSubject$teachersArgs<ExtArgs>;
    contributions?: boolean | Prisma.ClassSubject$contributionsArgs<ExtArgs>;
    forumThreads?: boolean | Prisma.ClassSubject$forumThreadsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClassSubjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ClassSubjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
};
export type ClassSubjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
};
export type $ClassSubjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ClassSubject";
    objects: {
        class: Prisma.$ClassPayload<ExtArgs>;
        subject: Prisma.$SubjectPayload<ExtArgs>;
        chapters: Prisma.$ChapterPayload<ExtArgs>[];
        teachers: Prisma.$TeacherAssignmentPayload<ExtArgs>[];
        contributions: Prisma.$ContributionPayload<ExtArgs>[];
        forumThreads: Prisma.$ForumThreadPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        classId: string;
        subjectId: string;
        coefficient: number | null;
        position: number;
        createdAt: Date;
    }, ExtArgs["result"]["classSubject"]>;
    composites: {};
};
export type ClassSubjectGetPayload<S extends boolean | null | undefined | ClassSubjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload, S>;
export type ClassSubjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClassSubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClassSubjectCountAggregateInputType | true;
};
export interface ClassSubjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ClassSubject'];
        meta: {
            name: 'ClassSubject';
        };
    };
    findUnique<T extends ClassSubjectFindUniqueArgs>(args: Prisma.SelectSubset<T, ClassSubjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ClassSubjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClassSubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ClassSubjectFindFirstArgs>(args?: Prisma.SelectSubset<T, ClassSubjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ClassSubjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClassSubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ClassSubjectFindManyArgs>(args?: Prisma.SelectSubset<T, ClassSubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ClassSubjectCreateArgs>(args: Prisma.SelectSubset<T, ClassSubjectCreateArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ClassSubjectCreateManyArgs>(args?: Prisma.SelectSubset<T, ClassSubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ClassSubjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ClassSubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ClassSubjectDeleteArgs>(args: Prisma.SelectSubset<T, ClassSubjectDeleteArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ClassSubjectUpdateArgs>(args: Prisma.SelectSubset<T, ClassSubjectUpdateArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ClassSubjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClassSubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ClassSubjectUpdateManyArgs>(args: Prisma.SelectSubset<T, ClassSubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ClassSubjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ClassSubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ClassSubjectUpsertArgs>(args: Prisma.SelectSubset<T, ClassSubjectUpsertArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ClassSubjectCountArgs>(args?: Prisma.Subset<T, ClassSubjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClassSubjectCountAggregateOutputType> : number>;
    aggregate<T extends ClassSubjectAggregateArgs>(args: Prisma.Subset<T, ClassSubjectAggregateArgs>): Prisma.PrismaPromise<GetClassSubjectAggregateType<T>>;
    groupBy<T extends ClassSubjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClassSubjectGroupByArgs['orderBy'];
    } : {
        orderBy?: ClassSubjectGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClassSubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ClassSubjectFieldRefs;
}
export interface Prisma__ClassSubjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    class<T extends Prisma.ClassDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    subject<T extends Prisma.SubjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubjectDefaultArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    chapters<T extends Prisma.ClassSubject$chaptersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassSubject$chaptersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    teachers<T extends Prisma.ClassSubject$teachersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassSubject$teachersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TeacherAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    contributions<T extends Prisma.ClassSubject$contributionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassSubject$contributionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    forumThreads<T extends Prisma.ClassSubject$forumThreadsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassSubject$forumThreadsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ClassSubjectFieldRefs {
    readonly id: Prisma.FieldRef<"ClassSubject", 'String'>;
    readonly classId: Prisma.FieldRef<"ClassSubject", 'String'>;
    readonly subjectId: Prisma.FieldRef<"ClassSubject", 'String'>;
    readonly coefficient: Prisma.FieldRef<"ClassSubject", 'Int'>;
    readonly position: Prisma.FieldRef<"ClassSubject", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"ClassSubject", 'DateTime'>;
}
export type ClassSubjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where: Prisma.ClassSubjectWhereUniqueInput;
};
export type ClassSubjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where: Prisma.ClassSubjectWhereUniqueInput;
};
export type ClassSubjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where?: Prisma.ClassSubjectWhereInput;
    orderBy?: Prisma.ClassSubjectOrderByWithRelationInput | Prisma.ClassSubjectOrderByWithRelationInput[];
    cursor?: Prisma.ClassSubjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassSubjectScalarFieldEnum | Prisma.ClassSubjectScalarFieldEnum[];
};
export type ClassSubjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where?: Prisma.ClassSubjectWhereInput;
    orderBy?: Prisma.ClassSubjectOrderByWithRelationInput | Prisma.ClassSubjectOrderByWithRelationInput[];
    cursor?: Prisma.ClassSubjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassSubjectScalarFieldEnum | Prisma.ClassSubjectScalarFieldEnum[];
};
export type ClassSubjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where?: Prisma.ClassSubjectWhereInput;
    orderBy?: Prisma.ClassSubjectOrderByWithRelationInput | Prisma.ClassSubjectOrderByWithRelationInput[];
    cursor?: Prisma.ClassSubjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassSubjectScalarFieldEnum | Prisma.ClassSubjectScalarFieldEnum[];
};
export type ClassSubjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassSubjectCreateInput, Prisma.ClassSubjectUncheckedCreateInput>;
};
export type ClassSubjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ClassSubjectCreateManyInput | Prisma.ClassSubjectCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClassSubjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    data: Prisma.ClassSubjectCreateManyInput | Prisma.ClassSubjectCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ClassSubjectIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ClassSubjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateInput, Prisma.ClassSubjectUncheckedUpdateInput>;
    where: Prisma.ClassSubjectWhereUniqueInput;
};
export type ClassSubjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ClassSubjectUpdateManyMutationInput, Prisma.ClassSubjectUncheckedUpdateManyInput>;
    where?: Prisma.ClassSubjectWhereInput;
    limit?: number;
};
export type ClassSubjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassSubjectUpdateManyMutationInput, Prisma.ClassSubjectUncheckedUpdateManyInput>;
    where?: Prisma.ClassSubjectWhereInput;
    limit?: number;
    include?: Prisma.ClassSubjectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ClassSubjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where: Prisma.ClassSubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassSubjectCreateInput, Prisma.ClassSubjectUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ClassSubjectUpdateInput, Prisma.ClassSubjectUncheckedUpdateInput>;
};
export type ClassSubjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where: Prisma.ClassSubjectWhereUniqueInput;
};
export type ClassSubjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassSubjectWhereInput;
    limit?: number;
};
export type ClassSubject$chaptersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChapterScalarFieldEnum | Prisma.ChapterScalarFieldEnum[];
};
export type ClassSubject$teachersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ClassSubject$contributionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionSelect<ExtArgs> | null;
    omit?: Prisma.ContributionOmit<ExtArgs> | null;
    include?: Prisma.ContributionInclude<ExtArgs> | null;
    where?: Prisma.ContributionWhereInput;
    orderBy?: Prisma.ContributionOrderByWithRelationInput | Prisma.ContributionOrderByWithRelationInput[];
    cursor?: Prisma.ContributionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContributionScalarFieldEnum | Prisma.ContributionScalarFieldEnum[];
};
export type ClassSubject$forumThreadsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where?: Prisma.ForumThreadWhereInput;
    orderBy?: Prisma.ForumThreadOrderByWithRelationInput | Prisma.ForumThreadOrderByWithRelationInput[];
    cursor?: Prisma.ForumThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForumThreadScalarFieldEnum | Prisma.ForumThreadScalarFieldEnum[];
};
export type ClassSubjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
};
