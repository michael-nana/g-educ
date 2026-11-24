import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ClassEnrollmentModel = runtime.Types.Result.DefaultSelection<Prisma.$ClassEnrollmentPayload>;
export type AggregateClassEnrollment = {
    _count: ClassEnrollmentCountAggregateOutputType | null;
    _min: ClassEnrollmentMinAggregateOutputType | null;
    _max: ClassEnrollmentMaxAggregateOutputType | null;
};
export type ClassEnrollmentMinAggregateOutputType = {
    id: string | null;
    studentProfileId: string | null;
    academicYearId: string | null;
    classId: string | null;
    createdAt: Date | null;
};
export type ClassEnrollmentMaxAggregateOutputType = {
    id: string | null;
    studentProfileId: string | null;
    academicYearId: string | null;
    classId: string | null;
    createdAt: Date | null;
};
export type ClassEnrollmentCountAggregateOutputType = {
    id: number;
    studentProfileId: number;
    academicYearId: number;
    classId: number;
    createdAt: number;
    _all: number;
};
export type ClassEnrollmentMinAggregateInputType = {
    id?: true;
    studentProfileId?: true;
    academicYearId?: true;
    classId?: true;
    createdAt?: true;
};
export type ClassEnrollmentMaxAggregateInputType = {
    id?: true;
    studentProfileId?: true;
    academicYearId?: true;
    classId?: true;
    createdAt?: true;
};
export type ClassEnrollmentCountAggregateInputType = {
    id?: true;
    studentProfileId?: true;
    academicYearId?: true;
    classId?: true;
    createdAt?: true;
    _all?: true;
};
export type ClassEnrollmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassEnrollmentWhereInput;
    orderBy?: Prisma.ClassEnrollmentOrderByWithRelationInput | Prisma.ClassEnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.ClassEnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ClassEnrollmentCountAggregateInputType;
    _min?: ClassEnrollmentMinAggregateInputType;
    _max?: ClassEnrollmentMaxAggregateInputType;
};
export type GetClassEnrollmentAggregateType<T extends ClassEnrollmentAggregateArgs> = {
    [P in keyof T & keyof AggregateClassEnrollment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateClassEnrollment[P]> : Prisma.GetScalarType<T[P], AggregateClassEnrollment[P]>;
};
export type ClassEnrollmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassEnrollmentWhereInput;
    orderBy?: Prisma.ClassEnrollmentOrderByWithAggregationInput | Prisma.ClassEnrollmentOrderByWithAggregationInput[];
    by: Prisma.ClassEnrollmentScalarFieldEnum[] | Prisma.ClassEnrollmentScalarFieldEnum;
    having?: Prisma.ClassEnrollmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClassEnrollmentCountAggregateInputType | true;
    _min?: ClassEnrollmentMinAggregateInputType;
    _max?: ClassEnrollmentMaxAggregateInputType;
};
export type ClassEnrollmentGroupByOutputType = {
    id: string;
    studentProfileId: string;
    academicYearId: string;
    classId: string;
    createdAt: Date;
    _count: ClassEnrollmentCountAggregateOutputType | null;
    _min: ClassEnrollmentMinAggregateOutputType | null;
    _max: ClassEnrollmentMaxAggregateOutputType | null;
};
export type GetClassEnrollmentGroupByPayload<T extends ClassEnrollmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClassEnrollmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClassEnrollmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClassEnrollmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClassEnrollmentGroupByOutputType[P]>;
}>>;
export type ClassEnrollmentWhereInput = {
    AND?: Prisma.ClassEnrollmentWhereInput | Prisma.ClassEnrollmentWhereInput[];
    OR?: Prisma.ClassEnrollmentWhereInput[];
    NOT?: Prisma.ClassEnrollmentWhereInput | Prisma.ClassEnrollmentWhereInput[];
    id?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    studentProfileId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    academicYearId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    classId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    createdAt?: Prisma.DateTimeFilter<"ClassEnrollment"> | Date | string;
    studentProfile?: Prisma.XOR<Prisma.StudentProfileScalarRelationFilter, Prisma.StudentProfileWhereInput>;
    academicYear?: Prisma.XOR<Prisma.AcademicYearScalarRelationFilter, Prisma.AcademicYearWhereInput>;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
};
export type ClassEnrollmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    studentProfile?: Prisma.StudentProfileOrderByWithRelationInput;
    academicYear?: Prisma.AcademicYearOrderByWithRelationInput;
    class?: Prisma.ClassOrderByWithRelationInput;
};
export type ClassEnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    studentProfileId_academicYearId?: Prisma.ClassEnrollmentStudentProfileIdAcademicYearIdCompoundUniqueInput;
    AND?: Prisma.ClassEnrollmentWhereInput | Prisma.ClassEnrollmentWhereInput[];
    OR?: Prisma.ClassEnrollmentWhereInput[];
    NOT?: Prisma.ClassEnrollmentWhereInput | Prisma.ClassEnrollmentWhereInput[];
    studentProfileId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    academicYearId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    classId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    createdAt?: Prisma.DateTimeFilter<"ClassEnrollment"> | Date | string;
    studentProfile?: Prisma.XOR<Prisma.StudentProfileScalarRelationFilter, Prisma.StudentProfileWhereInput>;
    academicYear?: Prisma.XOR<Prisma.AcademicYearScalarRelationFilter, Prisma.AcademicYearWhereInput>;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
}, "id" | "studentProfileId_academicYearId">;
export type ClassEnrollmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ClassEnrollmentCountOrderByAggregateInput;
    _max?: Prisma.ClassEnrollmentMaxOrderByAggregateInput;
    _min?: Prisma.ClassEnrollmentMinOrderByAggregateInput;
};
export type ClassEnrollmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClassEnrollmentScalarWhereWithAggregatesInput | Prisma.ClassEnrollmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClassEnrollmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClassEnrollmentScalarWhereWithAggregatesInput | Prisma.ClassEnrollmentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ClassEnrollment"> | string;
    studentProfileId?: Prisma.UuidWithAggregatesFilter<"ClassEnrollment"> | string;
    academicYearId?: Prisma.UuidWithAggregatesFilter<"ClassEnrollment"> | string;
    classId?: Prisma.UuidWithAggregatesFilter<"ClassEnrollment"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ClassEnrollment"> | Date | string;
};
export type ClassEnrollmentCreateInput = {
    id?: string;
    createdAt?: Date | string;
    studentProfile: Prisma.StudentProfileCreateNestedOneWithoutEnrollmentsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutEnrollmentsInput;
    class: Prisma.ClassCreateNestedOneWithoutEnrollmentsInput;
};
export type ClassEnrollmentUncheckedCreateInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    classId: string;
    createdAt?: Date | string;
};
export type ClassEnrollmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studentProfile?: Prisma.StudentProfileUpdateOneRequiredWithoutEnrollmentsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput;
    class?: Prisma.ClassUpdateOneRequiredWithoutEnrollmentsNestedInput;
};
export type ClassEnrollmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentCreateManyInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    classId: string;
    createdAt?: Date | string;
};
export type ClassEnrollmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentListRelationFilter = {
    every?: Prisma.ClassEnrollmentWhereInput;
    some?: Prisma.ClassEnrollmentWhereInput;
    none?: Prisma.ClassEnrollmentWhereInput;
};
export type ClassEnrollmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ClassEnrollmentStudentProfileIdAcademicYearIdCompoundUniqueInput = {
    studentProfileId: string;
    academicYearId: string;
};
export type ClassEnrollmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassEnrollmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassEnrollmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassEnrollmentCreateNestedManyWithoutAcademicYearInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutAcademicYearInput, Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput> | Prisma.ClassEnrollmentCreateWithoutAcademicYearInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutAcademicYearInput | Prisma.ClassEnrollmentCreateOrConnectWithoutAcademicYearInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyAcademicYearInputEnvelope;
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
};
export type ClassEnrollmentUncheckedCreateNestedManyWithoutAcademicYearInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutAcademicYearInput, Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput> | Prisma.ClassEnrollmentCreateWithoutAcademicYearInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutAcademicYearInput | Prisma.ClassEnrollmentCreateOrConnectWithoutAcademicYearInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyAcademicYearInputEnvelope;
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
};
export type ClassEnrollmentUpdateManyWithoutAcademicYearNestedInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutAcademicYearInput, Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput> | Prisma.ClassEnrollmentCreateWithoutAcademicYearInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutAcademicYearInput | Prisma.ClassEnrollmentCreateOrConnectWithoutAcademicYearInput[];
    upsert?: Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput | Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyAcademicYearInputEnvelope;
    set?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    disconnect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    delete?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    update?: Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput | Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput[];
    updateMany?: Prisma.ClassEnrollmentUpdateManyWithWhereWithoutAcademicYearInput | Prisma.ClassEnrollmentUpdateManyWithWhereWithoutAcademicYearInput[];
    deleteMany?: Prisma.ClassEnrollmentScalarWhereInput | Prisma.ClassEnrollmentScalarWhereInput[];
};
export type ClassEnrollmentUncheckedUpdateManyWithoutAcademicYearNestedInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutAcademicYearInput, Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput> | Prisma.ClassEnrollmentCreateWithoutAcademicYearInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutAcademicYearInput | Prisma.ClassEnrollmentCreateOrConnectWithoutAcademicYearInput[];
    upsert?: Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput | Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyAcademicYearInputEnvelope;
    set?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    disconnect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    delete?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    update?: Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput | Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput[];
    updateMany?: Prisma.ClassEnrollmentUpdateManyWithWhereWithoutAcademicYearInput | Prisma.ClassEnrollmentUpdateManyWithWhereWithoutAcademicYearInput[];
    deleteMany?: Prisma.ClassEnrollmentScalarWhereInput | Prisma.ClassEnrollmentScalarWhereInput[];
};
export type ClassEnrollmentCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutClassInput, Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput> | Prisma.ClassEnrollmentCreateWithoutClassInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutClassInput | Prisma.ClassEnrollmentCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyClassInputEnvelope;
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
};
export type ClassEnrollmentUncheckedCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutClassInput, Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput> | Prisma.ClassEnrollmentCreateWithoutClassInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutClassInput | Prisma.ClassEnrollmentCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyClassInputEnvelope;
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
};
export type ClassEnrollmentUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutClassInput, Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput> | Prisma.ClassEnrollmentCreateWithoutClassInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutClassInput | Prisma.ClassEnrollmentCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutClassInput | Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyClassInputEnvelope;
    set?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    disconnect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    delete?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    update?: Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutClassInput | Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.ClassEnrollmentUpdateManyWithWhereWithoutClassInput | Prisma.ClassEnrollmentUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.ClassEnrollmentScalarWhereInput | Prisma.ClassEnrollmentScalarWhereInput[];
};
export type ClassEnrollmentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutClassInput, Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput> | Prisma.ClassEnrollmentCreateWithoutClassInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutClassInput | Prisma.ClassEnrollmentCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutClassInput | Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyClassInputEnvelope;
    set?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    disconnect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    delete?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    update?: Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutClassInput | Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.ClassEnrollmentUpdateManyWithWhereWithoutClassInput | Prisma.ClassEnrollmentUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.ClassEnrollmentScalarWhereInput | Prisma.ClassEnrollmentScalarWhereInput[];
};
export type ClassEnrollmentCreateNestedManyWithoutStudentProfileInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutStudentProfileInput, Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput> | Prisma.ClassEnrollmentCreateWithoutStudentProfileInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutStudentProfileInput | Prisma.ClassEnrollmentCreateOrConnectWithoutStudentProfileInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyStudentProfileInputEnvelope;
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
};
export type ClassEnrollmentUncheckedCreateNestedManyWithoutStudentProfileInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutStudentProfileInput, Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput> | Prisma.ClassEnrollmentCreateWithoutStudentProfileInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutStudentProfileInput | Prisma.ClassEnrollmentCreateOrConnectWithoutStudentProfileInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyStudentProfileInputEnvelope;
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
};
export type ClassEnrollmentUpdateManyWithoutStudentProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutStudentProfileInput, Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput> | Prisma.ClassEnrollmentCreateWithoutStudentProfileInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutStudentProfileInput | Prisma.ClassEnrollmentCreateOrConnectWithoutStudentProfileInput[];
    upsert?: Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutStudentProfileInput | Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutStudentProfileInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyStudentProfileInputEnvelope;
    set?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    disconnect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    delete?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    update?: Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutStudentProfileInput | Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutStudentProfileInput[];
    updateMany?: Prisma.ClassEnrollmentUpdateManyWithWhereWithoutStudentProfileInput | Prisma.ClassEnrollmentUpdateManyWithWhereWithoutStudentProfileInput[];
    deleteMany?: Prisma.ClassEnrollmentScalarWhereInput | Prisma.ClassEnrollmentScalarWhereInput[];
};
export type ClassEnrollmentUncheckedUpdateManyWithoutStudentProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutStudentProfileInput, Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput> | Prisma.ClassEnrollmentCreateWithoutStudentProfileInput[] | Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput[];
    connectOrCreate?: Prisma.ClassEnrollmentCreateOrConnectWithoutStudentProfileInput | Prisma.ClassEnrollmentCreateOrConnectWithoutStudentProfileInput[];
    upsert?: Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutStudentProfileInput | Prisma.ClassEnrollmentUpsertWithWhereUniqueWithoutStudentProfileInput[];
    createMany?: Prisma.ClassEnrollmentCreateManyStudentProfileInputEnvelope;
    set?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    disconnect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    delete?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    connect?: Prisma.ClassEnrollmentWhereUniqueInput | Prisma.ClassEnrollmentWhereUniqueInput[];
    update?: Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutStudentProfileInput | Prisma.ClassEnrollmentUpdateWithWhereUniqueWithoutStudentProfileInput[];
    updateMany?: Prisma.ClassEnrollmentUpdateManyWithWhereWithoutStudentProfileInput | Prisma.ClassEnrollmentUpdateManyWithWhereWithoutStudentProfileInput[];
    deleteMany?: Prisma.ClassEnrollmentScalarWhereInput | Prisma.ClassEnrollmentScalarWhereInput[];
};
export type ClassEnrollmentCreateWithoutAcademicYearInput = {
    id?: string;
    createdAt?: Date | string;
    studentProfile: Prisma.StudentProfileCreateNestedOneWithoutEnrollmentsInput;
    class: Prisma.ClassCreateNestedOneWithoutEnrollmentsInput;
};
export type ClassEnrollmentUncheckedCreateWithoutAcademicYearInput = {
    id?: string;
    studentProfileId: string;
    classId: string;
    createdAt?: Date | string;
};
export type ClassEnrollmentCreateOrConnectWithoutAcademicYearInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutAcademicYearInput, Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput>;
};
export type ClassEnrollmentCreateManyAcademicYearInputEnvelope = {
    data: Prisma.ClassEnrollmentCreateManyAcademicYearInput | Prisma.ClassEnrollmentCreateManyAcademicYearInput[];
    skipDuplicates?: boolean;
};
export type ClassEnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassEnrollmentUpdateWithoutAcademicYearInput, Prisma.ClassEnrollmentUncheckedUpdateWithoutAcademicYearInput>;
    create: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutAcademicYearInput, Prisma.ClassEnrollmentUncheckedCreateWithoutAcademicYearInput>;
};
export type ClassEnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateWithoutAcademicYearInput, Prisma.ClassEnrollmentUncheckedUpdateWithoutAcademicYearInput>;
};
export type ClassEnrollmentUpdateManyWithWhereWithoutAcademicYearInput = {
    where: Prisma.ClassEnrollmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateManyMutationInput, Prisma.ClassEnrollmentUncheckedUpdateManyWithoutAcademicYearInput>;
};
export type ClassEnrollmentScalarWhereInput = {
    AND?: Prisma.ClassEnrollmentScalarWhereInput | Prisma.ClassEnrollmentScalarWhereInput[];
    OR?: Prisma.ClassEnrollmentScalarWhereInput[];
    NOT?: Prisma.ClassEnrollmentScalarWhereInput | Prisma.ClassEnrollmentScalarWhereInput[];
    id?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    studentProfileId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    academicYearId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    classId?: Prisma.UuidFilter<"ClassEnrollment"> | string;
    createdAt?: Prisma.DateTimeFilter<"ClassEnrollment"> | Date | string;
};
export type ClassEnrollmentCreateWithoutClassInput = {
    id?: string;
    createdAt?: Date | string;
    studentProfile: Prisma.StudentProfileCreateNestedOneWithoutEnrollmentsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutEnrollmentsInput;
};
export type ClassEnrollmentUncheckedCreateWithoutClassInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    createdAt?: Date | string;
};
export type ClassEnrollmentCreateOrConnectWithoutClassInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutClassInput, Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput>;
};
export type ClassEnrollmentCreateManyClassInputEnvelope = {
    data: Prisma.ClassEnrollmentCreateManyClassInput | Prisma.ClassEnrollmentCreateManyClassInput[];
    skipDuplicates?: boolean;
};
export type ClassEnrollmentUpsertWithWhereUniqueWithoutClassInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassEnrollmentUpdateWithoutClassInput, Prisma.ClassEnrollmentUncheckedUpdateWithoutClassInput>;
    create: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutClassInput, Prisma.ClassEnrollmentUncheckedCreateWithoutClassInput>;
};
export type ClassEnrollmentUpdateWithWhereUniqueWithoutClassInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateWithoutClassInput, Prisma.ClassEnrollmentUncheckedUpdateWithoutClassInput>;
};
export type ClassEnrollmentUpdateManyWithWhereWithoutClassInput = {
    where: Prisma.ClassEnrollmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateManyMutationInput, Prisma.ClassEnrollmentUncheckedUpdateManyWithoutClassInput>;
};
export type ClassEnrollmentCreateWithoutStudentProfileInput = {
    id?: string;
    createdAt?: Date | string;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutEnrollmentsInput;
    class: Prisma.ClassCreateNestedOneWithoutEnrollmentsInput;
};
export type ClassEnrollmentUncheckedCreateWithoutStudentProfileInput = {
    id?: string;
    academicYearId: string;
    classId: string;
    createdAt?: Date | string;
};
export type ClassEnrollmentCreateOrConnectWithoutStudentProfileInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutStudentProfileInput, Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput>;
};
export type ClassEnrollmentCreateManyStudentProfileInputEnvelope = {
    data: Prisma.ClassEnrollmentCreateManyStudentProfileInput | Prisma.ClassEnrollmentCreateManyStudentProfileInput[];
    skipDuplicates?: boolean;
};
export type ClassEnrollmentUpsertWithWhereUniqueWithoutStudentProfileInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassEnrollmentUpdateWithoutStudentProfileInput, Prisma.ClassEnrollmentUncheckedUpdateWithoutStudentProfileInput>;
    create: Prisma.XOR<Prisma.ClassEnrollmentCreateWithoutStudentProfileInput, Prisma.ClassEnrollmentUncheckedCreateWithoutStudentProfileInput>;
};
export type ClassEnrollmentUpdateWithWhereUniqueWithoutStudentProfileInput = {
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateWithoutStudentProfileInput, Prisma.ClassEnrollmentUncheckedUpdateWithoutStudentProfileInput>;
};
export type ClassEnrollmentUpdateManyWithWhereWithoutStudentProfileInput = {
    where: Prisma.ClassEnrollmentScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateManyMutationInput, Prisma.ClassEnrollmentUncheckedUpdateManyWithoutStudentProfileInput>;
};
export type ClassEnrollmentCreateManyAcademicYearInput = {
    id?: string;
    studentProfileId: string;
    classId: string;
    createdAt?: Date | string;
};
export type ClassEnrollmentUpdateWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studentProfile?: Prisma.StudentProfileUpdateOneRequiredWithoutEnrollmentsNestedInput;
    class?: Prisma.ClassUpdateOneRequiredWithoutEnrollmentsNestedInput;
};
export type ClassEnrollmentUncheckedUpdateWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentUncheckedUpdateManyWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentCreateManyClassInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    createdAt?: Date | string;
};
export type ClassEnrollmentUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studentProfile?: Prisma.StudentProfileUpdateOneRequiredWithoutEnrollmentsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput;
};
export type ClassEnrollmentUncheckedUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentUncheckedUpdateManyWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentCreateManyStudentProfileInput = {
    id?: string;
    academicYearId: string;
    classId: string;
    createdAt?: Date | string;
};
export type ClassEnrollmentUpdateWithoutStudentProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput;
    class?: Prisma.ClassUpdateOneRequiredWithoutEnrollmentsNestedInput;
};
export type ClassEnrollmentUncheckedUpdateWithoutStudentProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentUncheckedUpdateManyWithoutStudentProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassEnrollmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentProfileId?: boolean;
    academicYearId?: boolean;
    classId?: boolean;
    createdAt?: boolean;
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["classEnrollment"]>;
export type ClassEnrollmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentProfileId?: boolean;
    academicYearId?: boolean;
    classId?: boolean;
    createdAt?: boolean;
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["classEnrollment"]>;
export type ClassEnrollmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentProfileId?: boolean;
    academicYearId?: boolean;
    classId?: boolean;
    createdAt?: boolean;
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["classEnrollment"]>;
export type ClassEnrollmentSelectScalar = {
    id?: boolean;
    studentProfileId?: boolean;
    academicYearId?: boolean;
    classId?: boolean;
    createdAt?: boolean;
};
export type ClassEnrollmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "studentProfileId" | "academicYearId" | "classId" | "createdAt", ExtArgs["result"]["classEnrollment"]>;
export type ClassEnrollmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
};
export type ClassEnrollmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
};
export type ClassEnrollmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
};
export type $ClassEnrollmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ClassEnrollment";
    objects: {
        studentProfile: Prisma.$StudentProfilePayload<ExtArgs>;
        academicYear: Prisma.$AcademicYearPayload<ExtArgs>;
        class: Prisma.$ClassPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        studentProfileId: string;
        academicYearId: string;
        classId: string;
        createdAt: Date;
    }, ExtArgs["result"]["classEnrollment"]>;
    composites: {};
};
export type ClassEnrollmentGetPayload<S extends boolean | null | undefined | ClassEnrollmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload, S>;
export type ClassEnrollmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClassEnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClassEnrollmentCountAggregateInputType | true;
};
export interface ClassEnrollmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ClassEnrollment'];
        meta: {
            name: 'ClassEnrollment';
        };
    };
    findUnique<T extends ClassEnrollmentFindUniqueArgs>(args: Prisma.SelectSubset<T, ClassEnrollmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClassEnrollmentClient<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ClassEnrollmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClassEnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassEnrollmentClient<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ClassEnrollmentFindFirstArgs>(args?: Prisma.SelectSubset<T, ClassEnrollmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClassEnrollmentClient<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ClassEnrollmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClassEnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassEnrollmentClient<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ClassEnrollmentFindManyArgs>(args?: Prisma.SelectSubset<T, ClassEnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ClassEnrollmentCreateArgs>(args: Prisma.SelectSubset<T, ClassEnrollmentCreateArgs<ExtArgs>>): Prisma.Prisma__ClassEnrollmentClient<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ClassEnrollmentCreateManyArgs>(args?: Prisma.SelectSubset<T, ClassEnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ClassEnrollmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ClassEnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ClassEnrollmentDeleteArgs>(args: Prisma.SelectSubset<T, ClassEnrollmentDeleteArgs<ExtArgs>>): Prisma.Prisma__ClassEnrollmentClient<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ClassEnrollmentUpdateArgs>(args: Prisma.SelectSubset<T, ClassEnrollmentUpdateArgs<ExtArgs>>): Prisma.Prisma__ClassEnrollmentClient<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ClassEnrollmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClassEnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ClassEnrollmentUpdateManyArgs>(args: Prisma.SelectSubset<T, ClassEnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ClassEnrollmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ClassEnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ClassEnrollmentUpsertArgs>(args: Prisma.SelectSubset<T, ClassEnrollmentUpsertArgs<ExtArgs>>): Prisma.Prisma__ClassEnrollmentClient<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ClassEnrollmentCountArgs>(args?: Prisma.Subset<T, ClassEnrollmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClassEnrollmentCountAggregateOutputType> : number>;
    aggregate<T extends ClassEnrollmentAggregateArgs>(args: Prisma.Subset<T, ClassEnrollmentAggregateArgs>): Prisma.PrismaPromise<GetClassEnrollmentAggregateType<T>>;
    groupBy<T extends ClassEnrollmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClassEnrollmentGroupByArgs['orderBy'];
    } : {
        orderBy?: ClassEnrollmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClassEnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ClassEnrollmentFieldRefs;
}
export interface Prisma__ClassEnrollmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    studentProfile<T extends Prisma.StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudentProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    academicYear<T extends Prisma.AcademicYearDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicYearDefaultArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    class<T extends Prisma.ClassDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ClassEnrollmentFieldRefs {
    readonly id: Prisma.FieldRef<"ClassEnrollment", 'String'>;
    readonly studentProfileId: Prisma.FieldRef<"ClassEnrollment", 'String'>;
    readonly academicYearId: Prisma.FieldRef<"ClassEnrollment", 'String'>;
    readonly classId: Prisma.FieldRef<"ClassEnrollment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ClassEnrollment", 'DateTime'>;
}
export type ClassEnrollmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where: Prisma.ClassEnrollmentWhereUniqueInput;
};
export type ClassEnrollmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where: Prisma.ClassEnrollmentWhereUniqueInput;
};
export type ClassEnrollmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where?: Prisma.ClassEnrollmentWhereInput;
    orderBy?: Prisma.ClassEnrollmentOrderByWithRelationInput | Prisma.ClassEnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.ClassEnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassEnrollmentScalarFieldEnum | Prisma.ClassEnrollmentScalarFieldEnum[];
};
export type ClassEnrollmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where?: Prisma.ClassEnrollmentWhereInput;
    orderBy?: Prisma.ClassEnrollmentOrderByWithRelationInput | Prisma.ClassEnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.ClassEnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassEnrollmentScalarFieldEnum | Prisma.ClassEnrollmentScalarFieldEnum[];
};
export type ClassEnrollmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where?: Prisma.ClassEnrollmentWhereInput;
    orderBy?: Prisma.ClassEnrollmentOrderByWithRelationInput | Prisma.ClassEnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.ClassEnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassEnrollmentScalarFieldEnum | Prisma.ClassEnrollmentScalarFieldEnum[];
};
export type ClassEnrollmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassEnrollmentCreateInput, Prisma.ClassEnrollmentUncheckedCreateInput>;
};
export type ClassEnrollmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ClassEnrollmentCreateManyInput | Prisma.ClassEnrollmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClassEnrollmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    data: Prisma.ClassEnrollmentCreateManyInput | Prisma.ClassEnrollmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ClassEnrollmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ClassEnrollmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateInput, Prisma.ClassEnrollmentUncheckedUpdateInput>;
    where: Prisma.ClassEnrollmentWhereUniqueInput;
};
export type ClassEnrollmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateManyMutationInput, Prisma.ClassEnrollmentUncheckedUpdateManyInput>;
    where?: Prisma.ClassEnrollmentWhereInput;
    limit?: number;
};
export type ClassEnrollmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassEnrollmentUpdateManyMutationInput, Prisma.ClassEnrollmentUncheckedUpdateManyInput>;
    where?: Prisma.ClassEnrollmentWhereInput;
    limit?: number;
    include?: Prisma.ClassEnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ClassEnrollmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where: Prisma.ClassEnrollmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassEnrollmentCreateInput, Prisma.ClassEnrollmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ClassEnrollmentUpdateInput, Prisma.ClassEnrollmentUncheckedUpdateInput>;
};
export type ClassEnrollmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
    where: Prisma.ClassEnrollmentWhereUniqueInput;
};
export type ClassEnrollmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassEnrollmentWhereInput;
    limit?: number;
};
export type ClassEnrollmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassEnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.ClassEnrollmentOmit<ExtArgs> | null;
    include?: Prisma.ClassEnrollmentInclude<ExtArgs> | null;
};
