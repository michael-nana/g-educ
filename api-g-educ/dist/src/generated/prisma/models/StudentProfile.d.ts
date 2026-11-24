import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StudentProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$StudentProfilePayload>;
export type AggregateStudentProfile = {
    _count: StudentProfileCountAggregateOutputType | null;
    _min: StudentProfileMinAggregateOutputType | null;
    _max: StudentProfileMaxAggregateOutputType | null;
};
export type StudentProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    displayName: string | null;
    schoolName: string | null;
    classId: string | null;
    academicYearId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StudentProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    displayName: string | null;
    schoolName: string | null;
    classId: string | null;
    academicYearId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StudentProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    displayName: number;
    schoolName: number;
    classId: number;
    academicYearId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type StudentProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    schoolName?: true;
    classId?: true;
    academicYearId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StudentProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    schoolName?: true;
    classId?: true;
    academicYearId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StudentProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    schoolName?: true;
    classId?: true;
    academicYearId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type StudentProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProfileWhereInput;
    orderBy?: Prisma.StudentProfileOrderByWithRelationInput | Prisma.StudentProfileOrderByWithRelationInput[];
    cursor?: Prisma.StudentProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StudentProfileCountAggregateInputType;
    _min?: StudentProfileMinAggregateInputType;
    _max?: StudentProfileMaxAggregateInputType;
};
export type GetStudentProfileAggregateType<T extends StudentProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateStudentProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStudentProfile[P]> : Prisma.GetScalarType<T[P], AggregateStudentProfile[P]>;
};
export type StudentProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProfileWhereInput;
    orderBy?: Prisma.StudentProfileOrderByWithAggregationInput | Prisma.StudentProfileOrderByWithAggregationInput[];
    by: Prisma.StudentProfileScalarFieldEnum[] | Prisma.StudentProfileScalarFieldEnum;
    having?: Prisma.StudentProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StudentProfileCountAggregateInputType | true;
    _min?: StudentProfileMinAggregateInputType;
    _max?: StudentProfileMaxAggregateInputType;
};
export type StudentProfileGroupByOutputType = {
    id: string;
    userId: string;
    displayName: string;
    schoolName: string | null;
    classId: string;
    academicYearId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: StudentProfileCountAggregateOutputType | null;
    _min: StudentProfileMinAggregateOutputType | null;
    _max: StudentProfileMaxAggregateOutputType | null;
};
export type GetStudentProfileGroupByPayload<T extends StudentProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StudentProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StudentProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StudentProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StudentProfileGroupByOutputType[P]>;
}>>;
export type StudentProfileWhereInput = {
    AND?: Prisma.StudentProfileWhereInput | Prisma.StudentProfileWhereInput[];
    OR?: Prisma.StudentProfileWhereInput[];
    NOT?: Prisma.StudentProfileWhereInput | Prisma.StudentProfileWhereInput[];
    id?: Prisma.UuidFilter<"StudentProfile"> | string;
    userId?: Prisma.UuidFilter<"StudentProfile"> | string;
    displayName?: Prisma.StringFilter<"StudentProfile"> | string;
    schoolName?: Prisma.StringNullableFilter<"StudentProfile"> | string | null;
    classId?: Prisma.UuidFilter<"StudentProfile"> | string;
    academicYearId?: Prisma.UuidFilter<"StudentProfile"> | string;
    createdAt?: Prisma.DateTimeFilter<"StudentProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StudentProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    academicYear?: Prisma.XOR<Prisma.AcademicYearScalarRelationFilter, Prisma.AcademicYearWhereInput>;
    enrollments?: Prisma.ClassEnrollmentListRelationFilter;
    classChangeRequests?: Prisma.ClassChangeRequestListRelationFilter;
};
export type StudentProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    schoolName?: Prisma.SortOrderInput | Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    class?: Prisma.ClassOrderByWithRelationInput;
    academicYear?: Prisma.AcademicYearOrderByWithRelationInput;
    enrollments?: Prisma.ClassEnrollmentOrderByRelationAggregateInput;
    classChangeRequests?: Prisma.ClassChangeRequestOrderByRelationAggregateInput;
};
export type StudentProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    displayName?: string;
    AND?: Prisma.StudentProfileWhereInput | Prisma.StudentProfileWhereInput[];
    OR?: Prisma.StudentProfileWhereInput[];
    NOT?: Prisma.StudentProfileWhereInput | Prisma.StudentProfileWhereInput[];
    schoolName?: Prisma.StringNullableFilter<"StudentProfile"> | string | null;
    classId?: Prisma.UuidFilter<"StudentProfile"> | string;
    academicYearId?: Prisma.UuidFilter<"StudentProfile"> | string;
    createdAt?: Prisma.DateTimeFilter<"StudentProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StudentProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    academicYear?: Prisma.XOR<Prisma.AcademicYearScalarRelationFilter, Prisma.AcademicYearWhereInput>;
    enrollments?: Prisma.ClassEnrollmentListRelationFilter;
    classChangeRequests?: Prisma.ClassChangeRequestListRelationFilter;
}, "id" | "userId" | "displayName">;
export type StudentProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    schoolName?: Prisma.SortOrderInput | Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.StudentProfileCountOrderByAggregateInput;
    _max?: Prisma.StudentProfileMaxOrderByAggregateInput;
    _min?: Prisma.StudentProfileMinOrderByAggregateInput;
};
export type StudentProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.StudentProfileScalarWhereWithAggregatesInput | Prisma.StudentProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.StudentProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StudentProfileScalarWhereWithAggregatesInput | Prisma.StudentProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"StudentProfile"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"StudentProfile"> | string;
    displayName?: Prisma.StringWithAggregatesFilter<"StudentProfile"> | string;
    schoolName?: Prisma.StringNullableWithAggregatesFilter<"StudentProfile"> | string | null;
    classId?: Prisma.UuidWithAggregatesFilter<"StudentProfile"> | string;
    academicYearId?: Prisma.UuidWithAggregatesFilter<"StudentProfile"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StudentProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"StudentProfile"> | Date | string;
};
export type StudentProfileCreateInput = {
    id?: string;
    displayName: string;
    schoolName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudentProfileInput;
    class: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutStudentsInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutStudentProfileInput;
    classChangeRequests?: Prisma.ClassChangeRequestCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    displayName: string;
    schoolName?: string | null;
    classId: string;
    academicYearId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutStudentProfileInput;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentProfileNestedInput;
    class?: Prisma.ClassUpdateOneRequiredWithoutStudentsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutStudentsNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutStudentProfileNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutStudentProfileNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileCreateManyInput = {
    id?: string;
    userId: string;
    displayName: string;
    schoolName?: string | null;
    classId: string;
    academicYearId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentProfileListRelationFilter = {
    every?: Prisma.StudentProfileWhereInput;
    some?: Prisma.StudentProfileWhereInput;
    none?: Prisma.StudentProfileWhereInput;
};
export type StudentProfileOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StudentProfileNullableScalarRelationFilter = {
    is?: Prisma.StudentProfileWhereInput | null;
    isNot?: Prisma.StudentProfileWhereInput | null;
};
export type StudentProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    schoolName?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StudentProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    schoolName?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StudentProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    schoolName?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StudentProfileScalarRelationFilter = {
    is?: Prisma.StudentProfileWhereInput;
    isNot?: Prisma.StudentProfileWhereInput;
};
export type StudentProfileCreateNestedManyWithoutAcademicYearInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutAcademicYearInput, Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput> | Prisma.StudentProfileCreateWithoutAcademicYearInput[] | Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutAcademicYearInput | Prisma.StudentProfileCreateOrConnectWithoutAcademicYearInput[];
    createMany?: Prisma.StudentProfileCreateManyAcademicYearInputEnvelope;
    connect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
};
export type StudentProfileUncheckedCreateNestedManyWithoutAcademicYearInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutAcademicYearInput, Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput> | Prisma.StudentProfileCreateWithoutAcademicYearInput[] | Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutAcademicYearInput | Prisma.StudentProfileCreateOrConnectWithoutAcademicYearInput[];
    createMany?: Prisma.StudentProfileCreateManyAcademicYearInputEnvelope;
    connect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
};
export type StudentProfileUpdateManyWithoutAcademicYearNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutAcademicYearInput, Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput> | Prisma.StudentProfileCreateWithoutAcademicYearInput[] | Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutAcademicYearInput | Prisma.StudentProfileCreateOrConnectWithoutAcademicYearInput[];
    upsert?: Prisma.StudentProfileUpsertWithWhereUniqueWithoutAcademicYearInput | Prisma.StudentProfileUpsertWithWhereUniqueWithoutAcademicYearInput[];
    createMany?: Prisma.StudentProfileCreateManyAcademicYearInputEnvelope;
    set?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    disconnect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    delete?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    connect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    update?: Prisma.StudentProfileUpdateWithWhereUniqueWithoutAcademicYearInput | Prisma.StudentProfileUpdateWithWhereUniqueWithoutAcademicYearInput[];
    updateMany?: Prisma.StudentProfileUpdateManyWithWhereWithoutAcademicYearInput | Prisma.StudentProfileUpdateManyWithWhereWithoutAcademicYearInput[];
    deleteMany?: Prisma.StudentProfileScalarWhereInput | Prisma.StudentProfileScalarWhereInput[];
};
export type StudentProfileUncheckedUpdateManyWithoutAcademicYearNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutAcademicYearInput, Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput> | Prisma.StudentProfileCreateWithoutAcademicYearInput[] | Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutAcademicYearInput | Prisma.StudentProfileCreateOrConnectWithoutAcademicYearInput[];
    upsert?: Prisma.StudentProfileUpsertWithWhereUniqueWithoutAcademicYearInput | Prisma.StudentProfileUpsertWithWhereUniqueWithoutAcademicYearInput[];
    createMany?: Prisma.StudentProfileCreateManyAcademicYearInputEnvelope;
    set?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    disconnect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    delete?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    connect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    update?: Prisma.StudentProfileUpdateWithWhereUniqueWithoutAcademicYearInput | Prisma.StudentProfileUpdateWithWhereUniqueWithoutAcademicYearInput[];
    updateMany?: Prisma.StudentProfileUpdateManyWithWhereWithoutAcademicYearInput | Prisma.StudentProfileUpdateManyWithWhereWithoutAcademicYearInput[];
    deleteMany?: Prisma.StudentProfileScalarWhereInput | Prisma.StudentProfileScalarWhereInput[];
};
export type StudentProfileCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassInput, Prisma.StudentProfileUncheckedCreateWithoutClassInput> | Prisma.StudentProfileCreateWithoutClassInput[] | Prisma.StudentProfileUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutClassInput | Prisma.StudentProfileCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.StudentProfileCreateManyClassInputEnvelope;
    connect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
};
export type StudentProfileUncheckedCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassInput, Prisma.StudentProfileUncheckedCreateWithoutClassInput> | Prisma.StudentProfileCreateWithoutClassInput[] | Prisma.StudentProfileUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutClassInput | Prisma.StudentProfileCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.StudentProfileCreateManyClassInputEnvelope;
    connect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
};
export type StudentProfileUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassInput, Prisma.StudentProfileUncheckedCreateWithoutClassInput> | Prisma.StudentProfileCreateWithoutClassInput[] | Prisma.StudentProfileUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutClassInput | Prisma.StudentProfileCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.StudentProfileUpsertWithWhereUniqueWithoutClassInput | Prisma.StudentProfileUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.StudentProfileCreateManyClassInputEnvelope;
    set?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    disconnect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    delete?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    connect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    update?: Prisma.StudentProfileUpdateWithWhereUniqueWithoutClassInput | Prisma.StudentProfileUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.StudentProfileUpdateManyWithWhereWithoutClassInput | Prisma.StudentProfileUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.StudentProfileScalarWhereInput | Prisma.StudentProfileScalarWhereInput[];
};
export type StudentProfileUncheckedUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassInput, Prisma.StudentProfileUncheckedCreateWithoutClassInput> | Prisma.StudentProfileCreateWithoutClassInput[] | Prisma.StudentProfileUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutClassInput | Prisma.StudentProfileCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.StudentProfileUpsertWithWhereUniqueWithoutClassInput | Prisma.StudentProfileUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.StudentProfileCreateManyClassInputEnvelope;
    set?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    disconnect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    delete?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    connect?: Prisma.StudentProfileWhereUniqueInput | Prisma.StudentProfileWhereUniqueInput[];
    update?: Prisma.StudentProfileUpdateWithWhereUniqueWithoutClassInput | Prisma.StudentProfileUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.StudentProfileUpdateManyWithWhereWithoutClassInput | Prisma.StudentProfileUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.StudentProfileScalarWhereInput | Prisma.StudentProfileScalarWhereInput[];
};
export type StudentProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutUserInput, Prisma.StudentProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.StudentProfileWhereUniqueInput;
};
export type StudentProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutUserInput, Prisma.StudentProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.StudentProfileWhereUniqueInput;
};
export type StudentProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutUserInput, Prisma.StudentProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StudentProfileUpsertWithoutUserInput;
    disconnect?: Prisma.StudentProfileWhereInput | boolean;
    delete?: Prisma.StudentProfileWhereInput | boolean;
    connect?: Prisma.StudentProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentProfileUpdateToOneWithWhereWithoutUserInput, Prisma.StudentProfileUpdateWithoutUserInput>, Prisma.StudentProfileUncheckedUpdateWithoutUserInput>;
};
export type StudentProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutUserInput, Prisma.StudentProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StudentProfileUpsertWithoutUserInput;
    disconnect?: Prisma.StudentProfileWhereInput | boolean;
    delete?: Prisma.StudentProfileWhereInput | boolean;
    connect?: Prisma.StudentProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentProfileUpdateToOneWithWhereWithoutUserInput, Prisma.StudentProfileUpdateWithoutUserInput>, Prisma.StudentProfileUncheckedUpdateWithoutUserInput>;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type StudentProfileCreateNestedOneWithoutEnrollmentsInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutEnrollmentsInput, Prisma.StudentProfileUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutEnrollmentsInput;
    connect?: Prisma.StudentProfileWhereUniqueInput;
};
export type StudentProfileUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutEnrollmentsInput, Prisma.StudentProfileUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutEnrollmentsInput;
    upsert?: Prisma.StudentProfileUpsertWithoutEnrollmentsInput;
    connect?: Prisma.StudentProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentProfileUpdateToOneWithWhereWithoutEnrollmentsInput, Prisma.StudentProfileUpdateWithoutEnrollmentsInput>, Prisma.StudentProfileUncheckedUpdateWithoutEnrollmentsInput>;
};
export type StudentProfileCreateNestedOneWithoutClassChangeRequestsInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassChangeRequestsInput, Prisma.StudentProfileUncheckedCreateWithoutClassChangeRequestsInput>;
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutClassChangeRequestsInput;
    connect?: Prisma.StudentProfileWhereUniqueInput;
};
export type StudentProfileUpdateOneRequiredWithoutClassChangeRequestsNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassChangeRequestsInput, Prisma.StudentProfileUncheckedCreateWithoutClassChangeRequestsInput>;
    connectOrCreate?: Prisma.StudentProfileCreateOrConnectWithoutClassChangeRequestsInput;
    upsert?: Prisma.StudentProfileUpsertWithoutClassChangeRequestsInput;
    connect?: Prisma.StudentProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentProfileUpdateToOneWithWhereWithoutClassChangeRequestsInput, Prisma.StudentProfileUpdateWithoutClassChangeRequestsInput>, Prisma.StudentProfileUncheckedUpdateWithoutClassChangeRequestsInput>;
};
export type StudentProfileCreateWithoutAcademicYearInput = {
    id?: string;
    displayName: string;
    schoolName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudentProfileInput;
    class: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutStudentProfileInput;
    classChangeRequests?: Prisma.ClassChangeRequestCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileUncheckedCreateWithoutAcademicYearInput = {
    id?: string;
    userId: string;
    displayName: string;
    schoolName?: string | null;
    classId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutStudentProfileInput;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileCreateOrConnectWithoutAcademicYearInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutAcademicYearInput, Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput>;
};
export type StudentProfileCreateManyAcademicYearInputEnvelope = {
    data: Prisma.StudentProfileCreateManyAcademicYearInput | Prisma.StudentProfileCreateManyAcademicYearInput[];
    skipDuplicates?: boolean;
};
export type StudentProfileUpsertWithWhereUniqueWithoutAcademicYearInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudentProfileUpdateWithoutAcademicYearInput, Prisma.StudentProfileUncheckedUpdateWithoutAcademicYearInput>;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutAcademicYearInput, Prisma.StudentProfileUncheckedCreateWithoutAcademicYearInput>;
};
export type StudentProfileUpdateWithWhereUniqueWithoutAcademicYearInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudentProfileUpdateWithoutAcademicYearInput, Prisma.StudentProfileUncheckedUpdateWithoutAcademicYearInput>;
};
export type StudentProfileUpdateManyWithWhereWithoutAcademicYearInput = {
    where: Prisma.StudentProfileScalarWhereInput;
    data: Prisma.XOR<Prisma.StudentProfileUpdateManyMutationInput, Prisma.StudentProfileUncheckedUpdateManyWithoutAcademicYearInput>;
};
export type StudentProfileScalarWhereInput = {
    AND?: Prisma.StudentProfileScalarWhereInput | Prisma.StudentProfileScalarWhereInput[];
    OR?: Prisma.StudentProfileScalarWhereInput[];
    NOT?: Prisma.StudentProfileScalarWhereInput | Prisma.StudentProfileScalarWhereInput[];
    id?: Prisma.UuidFilter<"StudentProfile"> | string;
    userId?: Prisma.UuidFilter<"StudentProfile"> | string;
    displayName?: Prisma.StringFilter<"StudentProfile"> | string;
    schoolName?: Prisma.StringNullableFilter<"StudentProfile"> | string | null;
    classId?: Prisma.UuidFilter<"StudentProfile"> | string;
    academicYearId?: Prisma.UuidFilter<"StudentProfile"> | string;
    createdAt?: Prisma.DateTimeFilter<"StudentProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StudentProfile"> | Date | string;
};
export type StudentProfileCreateWithoutClassInput = {
    id?: string;
    displayName: string;
    schoolName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudentProfileInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutStudentsInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutStudentProfileInput;
    classChangeRequests?: Prisma.ClassChangeRequestCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileUncheckedCreateWithoutClassInput = {
    id?: string;
    userId: string;
    displayName: string;
    schoolName?: string | null;
    academicYearId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutStudentProfileInput;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileCreateOrConnectWithoutClassInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassInput, Prisma.StudentProfileUncheckedCreateWithoutClassInput>;
};
export type StudentProfileCreateManyClassInputEnvelope = {
    data: Prisma.StudentProfileCreateManyClassInput | Prisma.StudentProfileCreateManyClassInput[];
    skipDuplicates?: boolean;
};
export type StudentProfileUpsertWithWhereUniqueWithoutClassInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudentProfileUpdateWithoutClassInput, Prisma.StudentProfileUncheckedUpdateWithoutClassInput>;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassInput, Prisma.StudentProfileUncheckedCreateWithoutClassInput>;
};
export type StudentProfileUpdateWithWhereUniqueWithoutClassInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudentProfileUpdateWithoutClassInput, Prisma.StudentProfileUncheckedUpdateWithoutClassInput>;
};
export type StudentProfileUpdateManyWithWhereWithoutClassInput = {
    where: Prisma.StudentProfileScalarWhereInput;
    data: Prisma.XOR<Prisma.StudentProfileUpdateManyMutationInput, Prisma.StudentProfileUncheckedUpdateManyWithoutClassInput>;
};
export type StudentProfileCreateWithoutUserInput = {
    id?: string;
    displayName: string;
    schoolName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutStudentsInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutStudentProfileInput;
    classChangeRequests?: Prisma.ClassChangeRequestCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    displayName: string;
    schoolName?: string | null;
    classId: string;
    academicYearId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutStudentProfileInput;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutUserInput, Prisma.StudentProfileUncheckedCreateWithoutUserInput>;
};
export type StudentProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.StudentProfileUpdateWithoutUserInput, Prisma.StudentProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutUserInput, Prisma.StudentProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.StudentProfileWhereInput;
};
export type StudentProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.StudentProfileWhereInput;
    data: Prisma.XOR<Prisma.StudentProfileUpdateWithoutUserInput, Prisma.StudentProfileUncheckedUpdateWithoutUserInput>;
};
export type StudentProfileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutStudentsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutStudentsNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutStudentProfileNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutStudentProfileNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileCreateWithoutEnrollmentsInput = {
    id?: string;
    displayName: string;
    schoolName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudentProfileInput;
    class: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutStudentsInput;
    classChangeRequests?: Prisma.ClassChangeRequestCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileUncheckedCreateWithoutEnrollmentsInput = {
    id?: string;
    userId: string;
    displayName: string;
    schoolName?: string | null;
    classId: string;
    academicYearId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileCreateOrConnectWithoutEnrollmentsInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutEnrollmentsInput, Prisma.StudentProfileUncheckedCreateWithoutEnrollmentsInput>;
};
export type StudentProfileUpsertWithoutEnrollmentsInput = {
    update: Prisma.XOR<Prisma.StudentProfileUpdateWithoutEnrollmentsInput, Prisma.StudentProfileUncheckedUpdateWithoutEnrollmentsInput>;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutEnrollmentsInput, Prisma.StudentProfileUncheckedCreateWithoutEnrollmentsInput>;
    where?: Prisma.StudentProfileWhereInput;
};
export type StudentProfileUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: Prisma.StudentProfileWhereInput;
    data: Prisma.XOR<Prisma.StudentProfileUpdateWithoutEnrollmentsInput, Prisma.StudentProfileUncheckedUpdateWithoutEnrollmentsInput>;
};
export type StudentProfileUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentProfileNestedInput;
    class?: Prisma.ClassUpdateOneRequiredWithoutStudentsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutStudentsNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileUncheckedUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileCreateWithoutClassChangeRequestsInput = {
    id?: string;
    displayName: string;
    schoolName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudentProfileInput;
    class: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutStudentsInput;
    enrollments?: Prisma.ClassEnrollmentCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileUncheckedCreateWithoutClassChangeRequestsInput = {
    id?: string;
    userId: string;
    displayName: string;
    schoolName?: string | null;
    classId: string;
    academicYearId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedCreateNestedManyWithoutStudentProfileInput;
};
export type StudentProfileCreateOrConnectWithoutClassChangeRequestsInput = {
    where: Prisma.StudentProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassChangeRequestsInput, Prisma.StudentProfileUncheckedCreateWithoutClassChangeRequestsInput>;
};
export type StudentProfileUpsertWithoutClassChangeRequestsInput = {
    update: Prisma.XOR<Prisma.StudentProfileUpdateWithoutClassChangeRequestsInput, Prisma.StudentProfileUncheckedUpdateWithoutClassChangeRequestsInput>;
    create: Prisma.XOR<Prisma.StudentProfileCreateWithoutClassChangeRequestsInput, Prisma.StudentProfileUncheckedCreateWithoutClassChangeRequestsInput>;
    where?: Prisma.StudentProfileWhereInput;
};
export type StudentProfileUpdateToOneWithWhereWithoutClassChangeRequestsInput = {
    where?: Prisma.StudentProfileWhereInput;
    data: Prisma.XOR<Prisma.StudentProfileUpdateWithoutClassChangeRequestsInput, Prisma.StudentProfileUncheckedUpdateWithoutClassChangeRequestsInput>;
};
export type StudentProfileUpdateWithoutClassChangeRequestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentProfileNestedInput;
    class?: Prisma.ClassUpdateOneRequiredWithoutStudentsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutStudentsNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileUncheckedUpdateWithoutClassChangeRequestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileCreateManyAcademicYearInput = {
    id?: string;
    userId: string;
    displayName: string;
    schoolName?: string | null;
    classId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentProfileUpdateWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentProfileNestedInput;
    class?: Prisma.ClassUpdateOneRequiredWithoutStudentsNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutStudentProfileNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileUncheckedUpdateWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutStudentProfileNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileUncheckedUpdateManyWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentProfileCreateManyClassInput = {
    id?: string;
    userId: string;
    displayName: string;
    schoolName?: string | null;
    academicYearId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentProfileUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentProfileNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutStudentsNestedInput;
    enrollments?: Prisma.ClassEnrollmentUpdateManyWithoutStudentProfileNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileUncheckedUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.ClassEnrollmentUncheckedUpdateManyWithoutStudentProfileNestedInput;
    classChangeRequests?: Prisma.ClassChangeRequestUncheckedUpdateManyWithoutStudentProfileNestedInput;
};
export type StudentProfileUncheckedUpdateManyWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentProfileCountOutputType = {
    enrollments: number;
    classChangeRequests: number;
};
export type StudentProfileCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    enrollments?: boolean | StudentProfileCountOutputTypeCountEnrollmentsArgs;
    classChangeRequests?: boolean | StudentProfileCountOutputTypeCountClassChangeRequestsArgs;
};
export type StudentProfileCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileCountOutputTypeSelect<ExtArgs> | null;
};
export type StudentProfileCountOutputTypeCountEnrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassEnrollmentWhereInput;
};
export type StudentProfileCountOutputTypeCountClassChangeRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassChangeRequestWhereInput;
};
export type StudentProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    schoolName?: boolean;
    classId?: boolean;
    academicYearId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    enrollments?: boolean | Prisma.StudentProfile$enrollmentsArgs<ExtArgs>;
    classChangeRequests?: boolean | Prisma.StudentProfile$classChangeRequestsArgs<ExtArgs>;
    _count?: boolean | Prisma.StudentProfileCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studentProfile"]>;
export type StudentProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    schoolName?: boolean;
    classId?: boolean;
    academicYearId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studentProfile"]>;
export type StudentProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    schoolName?: boolean;
    classId?: boolean;
    academicYearId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studentProfile"]>;
export type StudentProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    schoolName?: boolean;
    classId?: boolean;
    academicYearId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type StudentProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "displayName" | "schoolName" | "classId" | "academicYearId" | "createdAt" | "updatedAt", ExtArgs["result"]["studentProfile"]>;
export type StudentProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    enrollments?: boolean | Prisma.StudentProfile$enrollmentsArgs<ExtArgs>;
    classChangeRequests?: boolean | Prisma.StudentProfile$classChangeRequestsArgs<ExtArgs>;
    _count?: boolean | Prisma.StudentProfileCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StudentProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
};
export type StudentProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
};
export type $StudentProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StudentProfile";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        class: Prisma.$ClassPayload<ExtArgs>;
        academicYear: Prisma.$AcademicYearPayload<ExtArgs>;
        enrollments: Prisma.$ClassEnrollmentPayload<ExtArgs>[];
        classChangeRequests: Prisma.$ClassChangeRequestPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        displayName: string;
        schoolName: string | null;
        classId: string;
        academicYearId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["studentProfile"]>;
    composites: {};
};
export type StudentProfileGetPayload<S extends boolean | null | undefined | StudentProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload, S>;
export type StudentProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StudentProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StudentProfileCountAggregateInputType | true;
};
export interface StudentProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StudentProfile'];
        meta: {
            name: 'StudentProfile';
        };
    };
    findUnique<T extends StudentProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, StudentProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StudentProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StudentProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StudentProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, StudentProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StudentProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StudentProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StudentProfileFindManyArgs>(args?: Prisma.SelectSubset<T, StudentProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StudentProfileCreateArgs>(args: Prisma.SelectSubset<T, StudentProfileCreateArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StudentProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, StudentProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StudentProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StudentProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StudentProfileDeleteArgs>(args: Prisma.SelectSubset<T, StudentProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StudentProfileUpdateArgs>(args: Prisma.SelectSubset<T, StudentProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StudentProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, StudentProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StudentProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, StudentProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StudentProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StudentProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StudentProfileUpsertArgs>(args: Prisma.SelectSubset<T, StudentProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StudentProfileCountArgs>(args?: Prisma.Subset<T, StudentProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StudentProfileCountAggregateOutputType> : number>;
    aggregate<T extends StudentProfileAggregateArgs>(args: Prisma.Subset<T, StudentProfileAggregateArgs>): Prisma.PrismaPromise<GetStudentProfileAggregateType<T>>;
    groupBy<T extends StudentProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StudentProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: StudentProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StudentProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StudentProfileFieldRefs;
}
export interface Prisma__StudentProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    class<T extends Prisma.ClassDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    academicYear<T extends Prisma.AcademicYearDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicYearDefaultArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    enrollments<T extends Prisma.StudentProfile$enrollmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudentProfile$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassEnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    classChangeRequests<T extends Prisma.StudentProfile$classChangeRequestsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudentProfile$classChangeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StudentProfileFieldRefs {
    readonly id: Prisma.FieldRef<"StudentProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"StudentProfile", 'String'>;
    readonly displayName: Prisma.FieldRef<"StudentProfile", 'String'>;
    readonly schoolName: Prisma.FieldRef<"StudentProfile", 'String'>;
    readonly classId: Prisma.FieldRef<"StudentProfile", 'String'>;
    readonly academicYearId: Prisma.FieldRef<"StudentProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"StudentProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"StudentProfile", 'DateTime'>;
}
export type StudentProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where: Prisma.StudentProfileWhereUniqueInput;
};
export type StudentProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where: Prisma.StudentProfileWhereUniqueInput;
};
export type StudentProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where?: Prisma.StudentProfileWhereInput;
    orderBy?: Prisma.StudentProfileOrderByWithRelationInput | Prisma.StudentProfileOrderByWithRelationInput[];
    cursor?: Prisma.StudentProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProfileScalarFieldEnum | Prisma.StudentProfileScalarFieldEnum[];
};
export type StudentProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where?: Prisma.StudentProfileWhereInput;
    orderBy?: Prisma.StudentProfileOrderByWithRelationInput | Prisma.StudentProfileOrderByWithRelationInput[];
    cursor?: Prisma.StudentProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProfileScalarFieldEnum | Prisma.StudentProfileScalarFieldEnum[];
};
export type StudentProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where?: Prisma.StudentProfileWhereInput;
    orderBy?: Prisma.StudentProfileOrderByWithRelationInput | Prisma.StudentProfileOrderByWithRelationInput[];
    cursor?: Prisma.StudentProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProfileScalarFieldEnum | Prisma.StudentProfileScalarFieldEnum[];
};
export type StudentProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentProfileCreateInput, Prisma.StudentProfileUncheckedCreateInput>;
};
export type StudentProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StudentProfileCreateManyInput | Prisma.StudentProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StudentProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    data: Prisma.StudentProfileCreateManyInput | Prisma.StudentProfileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StudentProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StudentProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentProfileUpdateInput, Prisma.StudentProfileUncheckedUpdateInput>;
    where: Prisma.StudentProfileWhereUniqueInput;
};
export type StudentProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StudentProfileUpdateManyMutationInput, Prisma.StudentProfileUncheckedUpdateManyInput>;
    where?: Prisma.StudentProfileWhereInput;
    limit?: number;
};
export type StudentProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentProfileUpdateManyMutationInput, Prisma.StudentProfileUncheckedUpdateManyInput>;
    where?: Prisma.StudentProfileWhereInput;
    limit?: number;
    include?: Prisma.StudentProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StudentProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where: Prisma.StudentProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProfileCreateInput, Prisma.StudentProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StudentProfileUpdateInput, Prisma.StudentProfileUncheckedUpdateInput>;
};
export type StudentProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
    where: Prisma.StudentProfileWhereUniqueInput;
};
export type StudentProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProfileWhereInput;
    limit?: number;
};
export type StudentProfile$enrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StudentProfile$classChangeRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    where?: Prisma.ClassChangeRequestWhereInput;
    orderBy?: Prisma.ClassChangeRequestOrderByWithRelationInput | Prisma.ClassChangeRequestOrderByWithRelationInput[];
    cursor?: Prisma.ClassChangeRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClassChangeRequestScalarFieldEnum | Prisma.ClassChangeRequestScalarFieldEnum[];
};
export type StudentProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProfileSelect<ExtArgs> | null;
    omit?: Prisma.StudentProfileOmit<ExtArgs> | null;
    include?: Prisma.StudentProfileInclude<ExtArgs> | null;
};
