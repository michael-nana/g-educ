import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ClassChangeRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$ClassChangeRequestPayload>;
export type AggregateClassChangeRequest = {
    _count: ClassChangeRequestCountAggregateOutputType | null;
    _min: ClassChangeRequestMinAggregateOutputType | null;
    _max: ClassChangeRequestMaxAggregateOutputType | null;
};
export type ClassChangeRequestMinAggregateOutputType = {
    id: string | null;
    studentProfileId: string | null;
    academicYearId: string | null;
    fromClassId: string | null;
    toClassId: string | null;
    status: $Enums.RequestStatus | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    note: string | null;
    createdAt: Date | null;
};
export type ClassChangeRequestMaxAggregateOutputType = {
    id: string | null;
    studentProfileId: string | null;
    academicYearId: string | null;
    fromClassId: string | null;
    toClassId: string | null;
    status: $Enums.RequestStatus | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    note: string | null;
    createdAt: Date | null;
};
export type ClassChangeRequestCountAggregateOutputType = {
    id: number;
    studentProfileId: number;
    academicYearId: number;
    fromClassId: number;
    toClassId: number;
    status: number;
    reviewedById: number;
    reviewedAt: number;
    note: number;
    createdAt: number;
    _all: number;
};
export type ClassChangeRequestMinAggregateInputType = {
    id?: true;
    studentProfileId?: true;
    academicYearId?: true;
    fromClassId?: true;
    toClassId?: true;
    status?: true;
    reviewedById?: true;
    reviewedAt?: true;
    note?: true;
    createdAt?: true;
};
export type ClassChangeRequestMaxAggregateInputType = {
    id?: true;
    studentProfileId?: true;
    academicYearId?: true;
    fromClassId?: true;
    toClassId?: true;
    status?: true;
    reviewedById?: true;
    reviewedAt?: true;
    note?: true;
    createdAt?: true;
};
export type ClassChangeRequestCountAggregateInputType = {
    id?: true;
    studentProfileId?: true;
    academicYearId?: true;
    fromClassId?: true;
    toClassId?: true;
    status?: true;
    reviewedById?: true;
    reviewedAt?: true;
    note?: true;
    createdAt?: true;
    _all?: true;
};
export type ClassChangeRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassChangeRequestWhereInput;
    orderBy?: Prisma.ClassChangeRequestOrderByWithRelationInput | Prisma.ClassChangeRequestOrderByWithRelationInput[];
    cursor?: Prisma.ClassChangeRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ClassChangeRequestCountAggregateInputType;
    _min?: ClassChangeRequestMinAggregateInputType;
    _max?: ClassChangeRequestMaxAggregateInputType;
};
export type GetClassChangeRequestAggregateType<T extends ClassChangeRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateClassChangeRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateClassChangeRequest[P]> : Prisma.GetScalarType<T[P], AggregateClassChangeRequest[P]>;
};
export type ClassChangeRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassChangeRequestWhereInput;
    orderBy?: Prisma.ClassChangeRequestOrderByWithAggregationInput | Prisma.ClassChangeRequestOrderByWithAggregationInput[];
    by: Prisma.ClassChangeRequestScalarFieldEnum[] | Prisma.ClassChangeRequestScalarFieldEnum;
    having?: Prisma.ClassChangeRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClassChangeRequestCountAggregateInputType | true;
    _min?: ClassChangeRequestMinAggregateInputType;
    _max?: ClassChangeRequestMaxAggregateInputType;
};
export type ClassChangeRequestGroupByOutputType = {
    id: string;
    studentProfileId: string;
    academicYearId: string;
    fromClassId: string;
    toClassId: string;
    status: $Enums.RequestStatus;
    reviewedById: string | null;
    reviewedAt: Date | null;
    note: string | null;
    createdAt: Date;
    _count: ClassChangeRequestCountAggregateOutputType | null;
    _min: ClassChangeRequestMinAggregateOutputType | null;
    _max: ClassChangeRequestMaxAggregateOutputType | null;
};
export type GetClassChangeRequestGroupByPayload<T extends ClassChangeRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClassChangeRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClassChangeRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClassChangeRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClassChangeRequestGroupByOutputType[P]>;
}>>;
export type ClassChangeRequestWhereInput = {
    AND?: Prisma.ClassChangeRequestWhereInput | Prisma.ClassChangeRequestWhereInput[];
    OR?: Prisma.ClassChangeRequestWhereInput[];
    NOT?: Prisma.ClassChangeRequestWhereInput | Prisma.ClassChangeRequestWhereInput[];
    id?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    studentProfileId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    academicYearId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    fromClassId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    toClassId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    status?: Prisma.EnumRequestStatusFilter<"ClassChangeRequest"> | $Enums.RequestStatus;
    reviewedById?: Prisma.UuidNullableFilter<"ClassChangeRequest"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"ClassChangeRequest"> | Date | string | null;
    note?: Prisma.StringNullableFilter<"ClassChangeRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClassChangeRequest"> | Date | string;
    studentProfile?: Prisma.XOR<Prisma.StudentProfileScalarRelationFilter, Prisma.StudentProfileWhereInput>;
    academicYear?: Prisma.XOR<Prisma.AcademicYearScalarRelationFilter, Prisma.AcademicYearWhereInput>;
    fromClass?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    toClass?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type ClassChangeRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    fromClassId?: Prisma.SortOrder;
    toClassId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    studentProfile?: Prisma.StudentProfileOrderByWithRelationInput;
    academicYear?: Prisma.AcademicYearOrderByWithRelationInput;
    fromClass?: Prisma.ClassOrderByWithRelationInput;
    toClass?: Prisma.ClassOrderByWithRelationInput;
    reviewedBy?: Prisma.UserOrderByWithRelationInput;
};
export type ClassChangeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ClassChangeRequestWhereInput | Prisma.ClassChangeRequestWhereInput[];
    OR?: Prisma.ClassChangeRequestWhereInput[];
    NOT?: Prisma.ClassChangeRequestWhereInput | Prisma.ClassChangeRequestWhereInput[];
    studentProfileId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    academicYearId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    fromClassId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    toClassId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    status?: Prisma.EnumRequestStatusFilter<"ClassChangeRequest"> | $Enums.RequestStatus;
    reviewedById?: Prisma.UuidNullableFilter<"ClassChangeRequest"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"ClassChangeRequest"> | Date | string | null;
    note?: Prisma.StringNullableFilter<"ClassChangeRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClassChangeRequest"> | Date | string;
    studentProfile?: Prisma.XOR<Prisma.StudentProfileScalarRelationFilter, Prisma.StudentProfileWhereInput>;
    academicYear?: Prisma.XOR<Prisma.AcademicYearScalarRelationFilter, Prisma.AcademicYearWhereInput>;
    fromClass?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    toClass?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    reviewedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type ClassChangeRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    fromClassId?: Prisma.SortOrder;
    toClassId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ClassChangeRequestCountOrderByAggregateInput;
    _max?: Prisma.ClassChangeRequestMaxOrderByAggregateInput;
    _min?: Prisma.ClassChangeRequestMinOrderByAggregateInput;
};
export type ClassChangeRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClassChangeRequestScalarWhereWithAggregatesInput | Prisma.ClassChangeRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClassChangeRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClassChangeRequestScalarWhereWithAggregatesInput | Prisma.ClassChangeRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ClassChangeRequest"> | string;
    studentProfileId?: Prisma.UuidWithAggregatesFilter<"ClassChangeRequest"> | string;
    academicYearId?: Prisma.UuidWithAggregatesFilter<"ClassChangeRequest"> | string;
    fromClassId?: Prisma.UuidWithAggregatesFilter<"ClassChangeRequest"> | string;
    toClassId?: Prisma.UuidWithAggregatesFilter<"ClassChangeRequest"> | string;
    status?: Prisma.EnumRequestStatusWithAggregatesFilter<"ClassChangeRequest"> | $Enums.RequestStatus;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"ClassChangeRequest"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ClassChangeRequest"> | Date | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"ClassChangeRequest"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ClassChangeRequest"> | Date | string;
};
export type ClassChangeRequestCreateInput = {
    id?: string;
    status?: $Enums.RequestStatus;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
    studentProfile: Prisma.StudentProfileCreateNestedOneWithoutClassChangeRequestsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutClassChangeRequestInput;
    fromClass: Prisma.ClassCreateNestedOneWithoutRequestsFromInput;
    toClass: Prisma.ClassCreateNestedOneWithoutRequestsToInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutClassRequestsReviewedInput;
};
export type ClassChangeRequestUncheckedCreateInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    fromClassId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studentProfile?: Prisma.StudentProfileUpdateOneRequiredWithoutClassChangeRequestsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutClassChangeRequestNestedInput;
    fromClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsFromNestedInput;
    toClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsToNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutClassRequestsReviewedNestedInput;
};
export type ClassChangeRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestCreateManyInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    fromClassId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestListRelationFilter = {
    every?: Prisma.ClassChangeRequestWhereInput;
    some?: Prisma.ClassChangeRequestWhereInput;
    none?: Prisma.ClassChangeRequestWhereInput;
};
export type ClassChangeRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ClassChangeRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    fromClassId?: Prisma.SortOrder;
    toClassId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassChangeRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    fromClassId?: Prisma.SortOrder;
    toClassId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassChangeRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentProfileId?: Prisma.SortOrder;
    academicYearId?: Prisma.SortOrder;
    fromClassId?: Prisma.SortOrder;
    toClassId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClassChangeRequestCreateNestedManyWithoutAcademicYearInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutAcademicYearInput, Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput> | Prisma.ClassChangeRequestCreateWithoutAcademicYearInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutAcademicYearInput | Prisma.ClassChangeRequestCreateOrConnectWithoutAcademicYearInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyAcademicYearInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUncheckedCreateNestedManyWithoutAcademicYearInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutAcademicYearInput, Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput> | Prisma.ClassChangeRequestCreateWithoutAcademicYearInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutAcademicYearInput | Prisma.ClassChangeRequestCreateOrConnectWithoutAcademicYearInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyAcademicYearInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUpdateManyWithoutAcademicYearNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutAcademicYearInput, Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput> | Prisma.ClassChangeRequestCreateWithoutAcademicYearInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutAcademicYearInput | Prisma.ClassChangeRequestCreateOrConnectWithoutAcademicYearInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutAcademicYearInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutAcademicYearInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyAcademicYearInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutAcademicYearInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutAcademicYearInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutAcademicYearInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutAcademicYearInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestUncheckedUpdateManyWithoutAcademicYearNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutAcademicYearInput, Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput> | Prisma.ClassChangeRequestCreateWithoutAcademicYearInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutAcademicYearInput | Prisma.ClassChangeRequestCreateOrConnectWithoutAcademicYearInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutAcademicYearInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutAcademicYearInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyAcademicYearInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutAcademicYearInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutAcademicYearInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutAcademicYearInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutAcademicYearInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestCreateNestedManyWithoutFromClassInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutFromClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput> | Prisma.ClassChangeRequestCreateWithoutFromClassInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutFromClassInput | Prisma.ClassChangeRequestCreateOrConnectWithoutFromClassInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyFromClassInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestCreateNestedManyWithoutToClassInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutToClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput> | Prisma.ClassChangeRequestCreateWithoutToClassInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutToClassInput | Prisma.ClassChangeRequestCreateOrConnectWithoutToClassInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyToClassInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUncheckedCreateNestedManyWithoutFromClassInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutFromClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput> | Prisma.ClassChangeRequestCreateWithoutFromClassInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutFromClassInput | Prisma.ClassChangeRequestCreateOrConnectWithoutFromClassInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyFromClassInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUncheckedCreateNestedManyWithoutToClassInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutToClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput> | Prisma.ClassChangeRequestCreateWithoutToClassInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutToClassInput | Prisma.ClassChangeRequestCreateOrConnectWithoutToClassInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyToClassInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUpdateManyWithoutFromClassNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutFromClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput> | Prisma.ClassChangeRequestCreateWithoutFromClassInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutFromClassInput | Prisma.ClassChangeRequestCreateOrConnectWithoutFromClassInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutFromClassInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutFromClassInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyFromClassInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutFromClassInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutFromClassInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutFromClassInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutFromClassInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestUpdateManyWithoutToClassNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutToClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput> | Prisma.ClassChangeRequestCreateWithoutToClassInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutToClassInput | Prisma.ClassChangeRequestCreateOrConnectWithoutToClassInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutToClassInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutToClassInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyToClassInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutToClassInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutToClassInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutToClassInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutToClassInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestUncheckedUpdateManyWithoutFromClassNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutFromClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput> | Prisma.ClassChangeRequestCreateWithoutFromClassInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutFromClassInput | Prisma.ClassChangeRequestCreateOrConnectWithoutFromClassInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutFromClassInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutFromClassInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyFromClassInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutFromClassInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutFromClassInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutFromClassInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutFromClassInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestUncheckedUpdateManyWithoutToClassNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutToClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput> | Prisma.ClassChangeRequestCreateWithoutToClassInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutToClassInput | Prisma.ClassChangeRequestCreateOrConnectWithoutToClassInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutToClassInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutToClassInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyToClassInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutToClassInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutToClassInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutToClassInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutToClassInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutReviewedByInput, Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput> | Prisma.ClassChangeRequestCreateWithoutReviewedByInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutReviewedByInput | Prisma.ClassChangeRequestCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyReviewedByInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutReviewedByInput, Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput> | Prisma.ClassChangeRequestCreateWithoutReviewedByInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutReviewedByInput | Prisma.ClassChangeRequestCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyReviewedByInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutReviewedByInput, Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput> | Prisma.ClassChangeRequestCreateWithoutReviewedByInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutReviewedByInput | Prisma.ClassChangeRequestCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyReviewedByInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutReviewedByInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutReviewedByInput, Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput> | Prisma.ClassChangeRequestCreateWithoutReviewedByInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutReviewedByInput | Prisma.ClassChangeRequestCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyReviewedByInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutReviewedByInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestCreateNestedManyWithoutStudentProfileInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutStudentProfileInput, Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput> | Prisma.ClassChangeRequestCreateWithoutStudentProfileInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutStudentProfileInput | Prisma.ClassChangeRequestCreateOrConnectWithoutStudentProfileInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyStudentProfileInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUncheckedCreateNestedManyWithoutStudentProfileInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutStudentProfileInput, Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput> | Prisma.ClassChangeRequestCreateWithoutStudentProfileInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutStudentProfileInput | Prisma.ClassChangeRequestCreateOrConnectWithoutStudentProfileInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyStudentProfileInputEnvelope;
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
};
export type ClassChangeRequestUpdateManyWithoutStudentProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutStudentProfileInput, Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput> | Prisma.ClassChangeRequestCreateWithoutStudentProfileInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutStudentProfileInput | Prisma.ClassChangeRequestCreateOrConnectWithoutStudentProfileInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutStudentProfileInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutStudentProfileInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyStudentProfileInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutStudentProfileInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutStudentProfileInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutStudentProfileInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutStudentProfileInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type ClassChangeRequestUncheckedUpdateManyWithoutStudentProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutStudentProfileInput, Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput> | Prisma.ClassChangeRequestCreateWithoutStudentProfileInput[] | Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput[];
    connectOrCreate?: Prisma.ClassChangeRequestCreateOrConnectWithoutStudentProfileInput | Prisma.ClassChangeRequestCreateOrConnectWithoutStudentProfileInput[];
    upsert?: Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutStudentProfileInput | Prisma.ClassChangeRequestUpsertWithWhereUniqueWithoutStudentProfileInput[];
    createMany?: Prisma.ClassChangeRequestCreateManyStudentProfileInputEnvelope;
    set?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    disconnect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    delete?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    connect?: Prisma.ClassChangeRequestWhereUniqueInput | Prisma.ClassChangeRequestWhereUniqueInput[];
    update?: Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutStudentProfileInput | Prisma.ClassChangeRequestUpdateWithWhereUniqueWithoutStudentProfileInput[];
    updateMany?: Prisma.ClassChangeRequestUpdateManyWithWhereWithoutStudentProfileInput | Prisma.ClassChangeRequestUpdateManyWithWhereWithoutStudentProfileInput[];
    deleteMany?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
};
export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus;
};
export type ClassChangeRequestCreateWithoutAcademicYearInput = {
    id?: string;
    status?: $Enums.RequestStatus;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
    studentProfile: Prisma.StudentProfileCreateNestedOneWithoutClassChangeRequestsInput;
    fromClass: Prisma.ClassCreateNestedOneWithoutRequestsFromInput;
    toClass: Prisma.ClassCreateNestedOneWithoutRequestsToInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutClassRequestsReviewedInput;
};
export type ClassChangeRequestUncheckedCreateWithoutAcademicYearInput = {
    id?: string;
    studentProfileId: string;
    fromClassId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestCreateOrConnectWithoutAcademicYearInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutAcademicYearInput, Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput>;
};
export type ClassChangeRequestCreateManyAcademicYearInputEnvelope = {
    data: Prisma.ClassChangeRequestCreateManyAcademicYearInput | Prisma.ClassChangeRequestCreateManyAcademicYearInput[];
    skipDuplicates?: boolean;
};
export type ClassChangeRequestUpsertWithWhereUniqueWithoutAcademicYearInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutAcademicYearInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutAcademicYearInput>;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutAcademicYearInput, Prisma.ClassChangeRequestUncheckedCreateWithoutAcademicYearInput>;
};
export type ClassChangeRequestUpdateWithWhereUniqueWithoutAcademicYearInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutAcademicYearInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutAcademicYearInput>;
};
export type ClassChangeRequestUpdateManyWithWhereWithoutAcademicYearInput = {
    where: Prisma.ClassChangeRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateManyMutationInput, Prisma.ClassChangeRequestUncheckedUpdateManyWithoutAcademicYearInput>;
};
export type ClassChangeRequestScalarWhereInput = {
    AND?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
    OR?: Prisma.ClassChangeRequestScalarWhereInput[];
    NOT?: Prisma.ClassChangeRequestScalarWhereInput | Prisma.ClassChangeRequestScalarWhereInput[];
    id?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    studentProfileId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    academicYearId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    fromClassId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    toClassId?: Prisma.UuidFilter<"ClassChangeRequest"> | string;
    status?: Prisma.EnumRequestStatusFilter<"ClassChangeRequest"> | $Enums.RequestStatus;
    reviewedById?: Prisma.UuidNullableFilter<"ClassChangeRequest"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"ClassChangeRequest"> | Date | string | null;
    note?: Prisma.StringNullableFilter<"ClassChangeRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClassChangeRequest"> | Date | string;
};
export type ClassChangeRequestCreateWithoutFromClassInput = {
    id?: string;
    status?: $Enums.RequestStatus;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
    studentProfile: Prisma.StudentProfileCreateNestedOneWithoutClassChangeRequestsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutClassChangeRequestInput;
    toClass: Prisma.ClassCreateNestedOneWithoutRequestsToInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutClassRequestsReviewedInput;
};
export type ClassChangeRequestUncheckedCreateWithoutFromClassInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestCreateOrConnectWithoutFromClassInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutFromClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput>;
};
export type ClassChangeRequestCreateManyFromClassInputEnvelope = {
    data: Prisma.ClassChangeRequestCreateManyFromClassInput | Prisma.ClassChangeRequestCreateManyFromClassInput[];
    skipDuplicates?: boolean;
};
export type ClassChangeRequestCreateWithoutToClassInput = {
    id?: string;
    status?: $Enums.RequestStatus;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
    studentProfile: Prisma.StudentProfileCreateNestedOneWithoutClassChangeRequestsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutClassChangeRequestInput;
    fromClass: Prisma.ClassCreateNestedOneWithoutRequestsFromInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutClassRequestsReviewedInput;
};
export type ClassChangeRequestUncheckedCreateWithoutToClassInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    fromClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestCreateOrConnectWithoutToClassInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutToClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput>;
};
export type ClassChangeRequestCreateManyToClassInputEnvelope = {
    data: Prisma.ClassChangeRequestCreateManyToClassInput | Prisma.ClassChangeRequestCreateManyToClassInput[];
    skipDuplicates?: boolean;
};
export type ClassChangeRequestUpsertWithWhereUniqueWithoutFromClassInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutFromClassInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutFromClassInput>;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutFromClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutFromClassInput>;
};
export type ClassChangeRequestUpdateWithWhereUniqueWithoutFromClassInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutFromClassInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutFromClassInput>;
};
export type ClassChangeRequestUpdateManyWithWhereWithoutFromClassInput = {
    where: Prisma.ClassChangeRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateManyMutationInput, Prisma.ClassChangeRequestUncheckedUpdateManyWithoutFromClassInput>;
};
export type ClassChangeRequestUpsertWithWhereUniqueWithoutToClassInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutToClassInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutToClassInput>;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutToClassInput, Prisma.ClassChangeRequestUncheckedCreateWithoutToClassInput>;
};
export type ClassChangeRequestUpdateWithWhereUniqueWithoutToClassInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutToClassInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutToClassInput>;
};
export type ClassChangeRequestUpdateManyWithWhereWithoutToClassInput = {
    where: Prisma.ClassChangeRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateManyMutationInput, Prisma.ClassChangeRequestUncheckedUpdateManyWithoutToClassInput>;
};
export type ClassChangeRequestCreateWithoutReviewedByInput = {
    id?: string;
    status?: $Enums.RequestStatus;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
    studentProfile: Prisma.StudentProfileCreateNestedOneWithoutClassChangeRequestsInput;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutClassChangeRequestInput;
    fromClass: Prisma.ClassCreateNestedOneWithoutRequestsFromInput;
    toClass: Prisma.ClassCreateNestedOneWithoutRequestsToInput;
};
export type ClassChangeRequestUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    fromClassId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutReviewedByInput, Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput>;
};
export type ClassChangeRequestCreateManyReviewedByInputEnvelope = {
    data: Prisma.ClassChangeRequestCreateManyReviewedByInput | Prisma.ClassChangeRequestCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type ClassChangeRequestUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutReviewedByInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutReviewedByInput, Prisma.ClassChangeRequestUncheckedCreateWithoutReviewedByInput>;
};
export type ClassChangeRequestUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutReviewedByInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutReviewedByInput>;
};
export type ClassChangeRequestUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.ClassChangeRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateManyMutationInput, Prisma.ClassChangeRequestUncheckedUpdateManyWithoutReviewedByInput>;
};
export type ClassChangeRequestCreateWithoutStudentProfileInput = {
    id?: string;
    status?: $Enums.RequestStatus;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
    academicYear: Prisma.AcademicYearCreateNestedOneWithoutClassChangeRequestInput;
    fromClass: Prisma.ClassCreateNestedOneWithoutRequestsFromInput;
    toClass: Prisma.ClassCreateNestedOneWithoutRequestsToInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutClassRequestsReviewedInput;
};
export type ClassChangeRequestUncheckedCreateWithoutStudentProfileInput = {
    id?: string;
    academicYearId: string;
    fromClassId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestCreateOrConnectWithoutStudentProfileInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutStudentProfileInput, Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput>;
};
export type ClassChangeRequestCreateManyStudentProfileInputEnvelope = {
    data: Prisma.ClassChangeRequestCreateManyStudentProfileInput | Prisma.ClassChangeRequestCreateManyStudentProfileInput[];
    skipDuplicates?: boolean;
};
export type ClassChangeRequestUpsertWithWhereUniqueWithoutStudentProfileInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutStudentProfileInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutStudentProfileInput>;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateWithoutStudentProfileInput, Prisma.ClassChangeRequestUncheckedCreateWithoutStudentProfileInput>;
};
export type ClassChangeRequestUpdateWithWhereUniqueWithoutStudentProfileInput = {
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateWithoutStudentProfileInput, Prisma.ClassChangeRequestUncheckedUpdateWithoutStudentProfileInput>;
};
export type ClassChangeRequestUpdateManyWithWhereWithoutStudentProfileInput = {
    where: Prisma.ClassChangeRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateManyMutationInput, Prisma.ClassChangeRequestUncheckedUpdateManyWithoutStudentProfileInput>;
};
export type ClassChangeRequestCreateManyAcademicYearInput = {
    id?: string;
    studentProfileId: string;
    fromClassId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestUpdateWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studentProfile?: Prisma.StudentProfileUpdateOneRequiredWithoutClassChangeRequestsNestedInput;
    fromClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsFromNestedInput;
    toClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsToNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutClassRequestsReviewedNestedInput;
};
export type ClassChangeRequestUncheckedUpdateWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestUncheckedUpdateManyWithoutAcademicYearInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestCreateManyFromClassInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestCreateManyToClassInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    fromClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestUpdateWithoutFromClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studentProfile?: Prisma.StudentProfileUpdateOneRequiredWithoutClassChangeRequestsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutClassChangeRequestNestedInput;
    toClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsToNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutClassRequestsReviewedNestedInput;
};
export type ClassChangeRequestUncheckedUpdateWithoutFromClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestUncheckedUpdateManyWithoutFromClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestUpdateWithoutToClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studentProfile?: Prisma.StudentProfileUpdateOneRequiredWithoutClassChangeRequestsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutClassChangeRequestNestedInput;
    fromClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsFromNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutClassRequestsReviewedNestedInput;
};
export type ClassChangeRequestUncheckedUpdateWithoutToClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestUncheckedUpdateManyWithoutToClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestCreateManyReviewedByInput = {
    id?: string;
    studentProfileId: string;
    academicYearId: string;
    fromClassId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studentProfile?: Prisma.StudentProfileUpdateOneRequiredWithoutClassChangeRequestsNestedInput;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutClassChangeRequestNestedInput;
    fromClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsFromNestedInput;
    toClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsToNestedInput;
};
export type ClassChangeRequestUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestCreateManyStudentProfileInput = {
    id?: string;
    academicYearId: string;
    fromClassId: string;
    toClassId: string;
    status?: $Enums.RequestStatus;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ClassChangeRequestUpdateWithoutStudentProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    academicYear?: Prisma.AcademicYearUpdateOneRequiredWithoutClassChangeRequestNestedInput;
    fromClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsFromNestedInput;
    toClass?: Prisma.ClassUpdateOneRequiredWithoutRequestsToNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutClassRequestsReviewedNestedInput;
};
export type ClassChangeRequestUncheckedUpdateWithoutStudentProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestUncheckedUpdateManyWithoutStudentProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    academicYearId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    toClassId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClassChangeRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentProfileId?: boolean;
    academicYearId?: boolean;
    fromClassId?: boolean;
    toClassId?: boolean;
    status?: boolean;
    reviewedById?: boolean;
    reviewedAt?: boolean;
    note?: boolean;
    createdAt?: boolean;
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    fromClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    toClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ClassChangeRequest$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["classChangeRequest"]>;
export type ClassChangeRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentProfileId?: boolean;
    academicYearId?: boolean;
    fromClassId?: boolean;
    toClassId?: boolean;
    status?: boolean;
    reviewedById?: boolean;
    reviewedAt?: boolean;
    note?: boolean;
    createdAt?: boolean;
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    fromClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    toClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ClassChangeRequest$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["classChangeRequest"]>;
export type ClassChangeRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentProfileId?: boolean;
    academicYearId?: boolean;
    fromClassId?: boolean;
    toClassId?: boolean;
    status?: boolean;
    reviewedById?: boolean;
    reviewedAt?: boolean;
    note?: boolean;
    createdAt?: boolean;
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    fromClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    toClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ClassChangeRequest$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["classChangeRequest"]>;
export type ClassChangeRequestSelectScalar = {
    id?: boolean;
    studentProfileId?: boolean;
    academicYearId?: boolean;
    fromClassId?: boolean;
    toClassId?: boolean;
    status?: boolean;
    reviewedById?: boolean;
    reviewedAt?: boolean;
    note?: boolean;
    createdAt?: boolean;
};
export type ClassChangeRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "studentProfileId" | "academicYearId" | "fromClassId" | "toClassId" | "status" | "reviewedById" | "reviewedAt" | "note" | "createdAt", ExtArgs["result"]["classChangeRequest"]>;
export type ClassChangeRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    fromClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    toClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ClassChangeRequest$reviewedByArgs<ExtArgs>;
};
export type ClassChangeRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    fromClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    toClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ClassChangeRequest$reviewedByArgs<ExtArgs>;
};
export type ClassChangeRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    studentProfile?: boolean | Prisma.StudentProfileDefaultArgs<ExtArgs>;
    academicYear?: boolean | Prisma.AcademicYearDefaultArgs<ExtArgs>;
    fromClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    toClass?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.ClassChangeRequest$reviewedByArgs<ExtArgs>;
};
export type $ClassChangeRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ClassChangeRequest";
    objects: {
        studentProfile: Prisma.$StudentProfilePayload<ExtArgs>;
        academicYear: Prisma.$AcademicYearPayload<ExtArgs>;
        fromClass: Prisma.$ClassPayload<ExtArgs>;
        toClass: Prisma.$ClassPayload<ExtArgs>;
        reviewedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        studentProfileId: string;
        academicYearId: string;
        fromClassId: string;
        toClassId: string;
        status: $Enums.RequestStatus;
        reviewedById: string | null;
        reviewedAt: Date | null;
        note: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["classChangeRequest"]>;
    composites: {};
};
export type ClassChangeRequestGetPayload<S extends boolean | null | undefined | ClassChangeRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload, S>;
export type ClassChangeRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClassChangeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClassChangeRequestCountAggregateInputType | true;
};
export interface ClassChangeRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ClassChangeRequest'];
        meta: {
            name: 'ClassChangeRequest';
        };
    };
    findUnique<T extends ClassChangeRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, ClassChangeRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClassChangeRequestClient<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ClassChangeRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClassChangeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassChangeRequestClient<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ClassChangeRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, ClassChangeRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClassChangeRequestClient<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ClassChangeRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClassChangeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClassChangeRequestClient<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ClassChangeRequestFindManyArgs>(args?: Prisma.SelectSubset<T, ClassChangeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ClassChangeRequestCreateArgs>(args: Prisma.SelectSubset<T, ClassChangeRequestCreateArgs<ExtArgs>>): Prisma.Prisma__ClassChangeRequestClient<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ClassChangeRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, ClassChangeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ClassChangeRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ClassChangeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ClassChangeRequestDeleteArgs>(args: Prisma.SelectSubset<T, ClassChangeRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__ClassChangeRequestClient<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ClassChangeRequestUpdateArgs>(args: Prisma.SelectSubset<T, ClassChangeRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__ClassChangeRequestClient<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ClassChangeRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClassChangeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ClassChangeRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, ClassChangeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ClassChangeRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ClassChangeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ClassChangeRequestUpsertArgs>(args: Prisma.SelectSubset<T, ClassChangeRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__ClassChangeRequestClient<runtime.Types.Result.GetResult<Prisma.$ClassChangeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ClassChangeRequestCountArgs>(args?: Prisma.Subset<T, ClassChangeRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClassChangeRequestCountAggregateOutputType> : number>;
    aggregate<T extends ClassChangeRequestAggregateArgs>(args: Prisma.Subset<T, ClassChangeRequestAggregateArgs>): Prisma.PrismaPromise<GetClassChangeRequestAggregateType<T>>;
    groupBy<T extends ClassChangeRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClassChangeRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: ClassChangeRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClassChangeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassChangeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ClassChangeRequestFieldRefs;
}
export interface Prisma__ClassChangeRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    studentProfile<T extends Prisma.StudentProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudentProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__StudentProfileClient<runtime.Types.Result.GetResult<Prisma.$StudentProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    academicYear<T extends Prisma.AcademicYearDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicYearDefaultArgs<ExtArgs>>): Prisma.Prisma__AcademicYearClient<runtime.Types.Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    fromClass<T extends Prisma.ClassDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    toClass<T extends Prisma.ClassDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewedBy<T extends Prisma.ClassChangeRequest$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassChangeRequest$reviewedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ClassChangeRequestFieldRefs {
    readonly id: Prisma.FieldRef<"ClassChangeRequest", 'String'>;
    readonly studentProfileId: Prisma.FieldRef<"ClassChangeRequest", 'String'>;
    readonly academicYearId: Prisma.FieldRef<"ClassChangeRequest", 'String'>;
    readonly fromClassId: Prisma.FieldRef<"ClassChangeRequest", 'String'>;
    readonly toClassId: Prisma.FieldRef<"ClassChangeRequest", 'String'>;
    readonly status: Prisma.FieldRef<"ClassChangeRequest", 'RequestStatus'>;
    readonly reviewedById: Prisma.FieldRef<"ClassChangeRequest", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"ClassChangeRequest", 'DateTime'>;
    readonly note: Prisma.FieldRef<"ClassChangeRequest", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ClassChangeRequest", 'DateTime'>;
}
export type ClassChangeRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    where: Prisma.ClassChangeRequestWhereUniqueInput;
};
export type ClassChangeRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    where: Prisma.ClassChangeRequestWhereUniqueInput;
};
export type ClassChangeRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ClassChangeRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ClassChangeRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ClassChangeRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassChangeRequestCreateInput, Prisma.ClassChangeRequestUncheckedCreateInput>;
};
export type ClassChangeRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ClassChangeRequestCreateManyInput | Prisma.ClassChangeRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ClassChangeRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    data: Prisma.ClassChangeRequestCreateManyInput | Prisma.ClassChangeRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ClassChangeRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ClassChangeRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateInput, Prisma.ClassChangeRequestUncheckedUpdateInput>;
    where: Prisma.ClassChangeRequestWhereUniqueInput;
};
export type ClassChangeRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateManyMutationInput, Prisma.ClassChangeRequestUncheckedUpdateManyInput>;
    where?: Prisma.ClassChangeRequestWhereInput;
    limit?: number;
};
export type ClassChangeRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ClassChangeRequestUpdateManyMutationInput, Prisma.ClassChangeRequestUncheckedUpdateManyInput>;
    where?: Prisma.ClassChangeRequestWhereInput;
    limit?: number;
    include?: Prisma.ClassChangeRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ClassChangeRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    where: Prisma.ClassChangeRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClassChangeRequestCreateInput, Prisma.ClassChangeRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ClassChangeRequestUpdateInput, Prisma.ClassChangeRequestUncheckedUpdateInput>;
};
export type ClassChangeRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
    where: Prisma.ClassChangeRequestWhereUniqueInput;
};
export type ClassChangeRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClassChangeRequestWhereInput;
    limit?: number;
};
export type ClassChangeRequest$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type ClassChangeRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassChangeRequestSelect<ExtArgs> | null;
    omit?: Prisma.ClassChangeRequestOmit<ExtArgs> | null;
    include?: Prisma.ClassChangeRequestInclude<ExtArgs> | null;
};
