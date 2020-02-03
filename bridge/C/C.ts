
///////////////////////////////////////////////////////////////////////////////

// grammar definition

// TranslationUnit : Unit -> externalDeclarations
// AbstractPointerDeclarator : abstractDeclarator -> pointer
// AbstractPointerDirectDeclarator : abstractDeclarator -> pointer directAbstractDeclarator
// AbstractDirectDeclarator : abstractDeclarator -> directAbstractDeclarator
// MultiplicativeAdditiveExpression : additiveExpression -> multiplicativeExpression
// AdditivePlusExpression : additiveExpression -> additiveExpression "plus()" multiplicativeExpression
// AdditiveMinusExpression : additiveExpression -> additiveExpression "minus()" multiplicativeExpression
// EqualityAndExpression : andExpression -> equalityExpression
// EqualityAndExpressions : andExpression -> andExpression equalityExpression
// ConditionalAssignmentExpression : assignmentExpression -> conditionalExpression
// AssignmentExpressions : assignmentExpression -> unaryExpression assignmentOperator assignmentExpression
// AssignmentExpressions : assignmentExpressions -> assignmentExpression assignmentExpressions
// AssignmentExpressions : assignmentExpressions -> eps
// AssignmentEqualOperator : assignmentOperator -> "euaql()"
// AssignmentMultiEqualOperator : assignmentOperator -> "multiEqual()"
// AssignmentDivEqualOperator : assignmentOperator -> "divEqual()"
// AssignmentPercentEqualOperator : assignmentOperator -> "percentEqual()"
// AssignmentPlusEqualOperator : assignmentOperator -> "plusEqual()"
// AssignmentMinuxEqualOperator : assignmentOperator -> "minusEqual()"
// AssignmentLeftShiftOperator : assignmentOperator -> "leftShiftEqual()"
// AssignmentRightShiftOperator : assignmentOperator -> "rifhtShiftEqual()"
// AssignmentAndEqualOperator : assignmentOperator -> "andEqual()"
// AssignmentXorEqualOperator : assignmentOperator -> "xorEqual()"
// AssignmentOrEqualOperator : assignmentOperator -> "orEqual()"
// CastExpression : castExpression -> unaryExpression
// CastExpressions : castExpression -> typeName castExpression
// CompoundStatement : compoundStatement -> declarations statements
// ConditionExpression : conditionExpression -> expression
// EpsilonConditionExpression : conditionExpression -> eps
// ConditionalLogicalOrExpression : conditionalExpression -> logicalOrExpression
// ConditionalLogicalOrExpressions : conditionalExpression -> logicalOrExpression expression conditionalExpression
// ConstantInteger : constant -> "integer(number)"
// ConstantString : constant -> "character(string)"
// ConstantFloat : constant -> "floating(number)"
// ConstantEnum : constant -> enumerationConstant
// ConditionalConstantExpression : constantExpression -> conditionalExpression
// DeclExpression : declExpression -> expression
// EpsilonDeclExpression : declExpression -> eps
// Declaration : declaration -> declarationSpecifier declarationSpecifiers initDeclarators
// StorageDeclarationSpecifier : declarationSpecifier -> storageClassSpecifier
// TypeDeclarationSpecifier : declarationSpecifier -> typeSpecifier
// TypeQualifierDeclarationSpecifier : declarationSpecifier -> typeQualifier
// DeclarationSpecifiers : declarationSpecifiers -> declarationSpecifiers declarationSpecifier
// EpsilonDeclarationSpecifiers : declarationSpecifiers -> eps
// Declarations : declarations -> declarations declaration
// EpsilonDeclarations : declarations -> eps
// PointerDeclarator : declarator -> pointer directDeclarator
// DirectDeclarator : declarator -> directDeclarator
// DirectAbstractDeclarator : directAbstractDeclarator -> abstractDeclarator
// DirectConstantAbstractDeclarator : directAbstractDeclarator -> constantExpression
// DirectConstantAbstractDeclarators : directAbstractDeclarator -> directAbstractDeclarator constantExpression
// DirectIndexAbstractDeclarator : directAbstractDeclarator -> "index()"
// DirectNoIndexAbstractDeclarator : directAbstractDeclarator -> directAbstractDeclarator "noIndex()"
// DirectParameterTypeListAbstractDeclarator : directAbstractDeclarator -> parameterTypeList
// DirectParameterTypeListAbstractDeclarators : directAbstractDeclarator -> directAbstractDeclarator parameterTypeList
// DirectParamAbstractDeclarator : directAbstractDeclarator -> "param()"
// DirectNoParamAbstractDeclarator : directAbstractDeclarator -> directAbstractDeclarator "noParam()"
// IdentifierDirectDeclarator : directDeclarator -> identifier
// DeclaratorDirectDeclarator : directDeclarator -> declarator
// SquareConstantDirectDeclarator : directDeclarator -> directDeclarator constantExpression
// SquareDirectDeclarator : directDeclarator -> directDeclarator
// CurlyParameterDirectDeclarator : directDeclarator -> directDeclarator parameterTypeList
// CurlyDirectDeclarator : directDeclarator -> identifiers
// EnumIdentifierListSpecifier : enumSpecifier -> "enum()" identifier enumeratorList
// EnumListSpecifier : enumSpecifier -> "enum()" enumeratorList
// EnumIdentifierSpecifier : enumSpecifier -> "enum()" identifier
// EnumeratorIdentifier : enumerator -> identifier
// EnumeratorList : enumeratorList -> enumerator
// EnumeratorLists : enumeratorList -> enumeratorList enumerator
// RelationalEqualityExpression : equalityExpression -> relationalExpression
// EqualityExpression : equalityExpression -> equalityExpression "equals()" relationalExpression
// NotEqualityExpression : equalityExpression -> equalityExpression "notEquals()" relationalExpression
// ExclusiveOrAndExpression : exclusiveOrExpression -> andExpression
// ExclusiveOrAndExpressions : exclusiveOrExpression -> exclusiveOrExpression andExpression
// ExpressionAssignmentExpression : expression -> assignmentExpression
// ExpressionAssignmentExpressions : expression -> expression assignmentExpression
// ExpressionStatement : expressionStatement -> expression
// EpsilonExpressionStatement : expressionStatement -> eps
// FunctionExternalDeclaration : externalDeclaration -> functionDefinition
// ExternalDeclaration : externalDeclaration -> declaration
// ExternalDeclarations : externalDeclarations -> externalDeclaration externalDeclarations
// EpsilonExternalDeclarations : externalDeclarations -> eps
// FunctionDefinition : functionDefinition -> declarationSpecifiers declarator declarations compoundStatement
// Identifier : identifier -> constantExpression
// Identifiers : identifiers -> identifier identifiers
// EpsilonIdentifiers : identifiers -> eps
// InclusiveOrExclusiveOrExpression : inclusiveOrExpression -> exclusiveOrExpression
// InclusiveOrExclusiveOrExpression : inclusiveOrExpression -> inclusiveOrExpression exclusiveOrExpression
// InitDeclarator : initDeclarator -> declarator
// InitInitializerDeclarator : initDeclarator -> declarator initializer
// InitDeclarators : initDeclarators -> initDeclarators initDeclarator
// EpsilonInitDeclarators : initDeclarators -> eps
// AssignmentInitializer : initializer -> assignmentExpression
// Initializer : initializer -> initializerList
// initializerList : initializerList -> initializer
// initializerLists : initializerList -> initializerList initializer
// WhileStatement : iterationStatement -> "while()" expression statement
// DoWhileStatement : iterationStatement -> "do()" statement "while()" expression
// ForStatement : iterationStatement -> "for()" declExpression conditionExpression updateExpression statement
// GotoStatement : jumpStatement -> "goto()" identifier
// ContinueStatement : jumpStatement -> "continue()" identifier
// BreakStatement : jumpStatement -> "break()" identifier
// ReturnStatement : jumpStatement -> "return()" identifier
// LabeledStatement : labeledStatement -> identifier statement
// CaseStatement : labeledStatement -> "case()" constantExpression statement
// DefaultStatement : labeledStatement -> "default()" statement
// LogicalAndInclusiveOrExpression : logicalAndExpression -> inclusiveOrExpression
// LogicalAndAndInclusiveOrExpression : logicalAndExpression -> logicalAndExpression inclusiveOrExpression
// LogicalOrAndExpression : logicalOrExpression -> logicalAndExpression
// LogicalOrOrAndExpression : logicalOrExpression -> logicalOrExpression logicalAndExpression
// MultiplicativeCastExpression : multiplicativeExpression -> castExpression
// MultiMultiplicativeExpression : multiplicativeExpression -> multiplicativeExpression "multi()" castExpression
// DivMultiplicativeExpression : multiplicativeExpression -> multiplicativeExpression "div()" castExpression
// PercentMultiplicativeExpression : multiplicativeExpression -> multiplicativeExpression "percent()" castExpression
// DeclaratorParameterDeclaration : parameterDeclaration -> declarationSpecifier declarationSpecifiers declarator
// AbstractParameterDeclaration : parameterDeclaration -> declarationSpecifier declarationSpecifiers abstractDeclarator
// ParameterDeclaration : parameterDeclaration -> declarationSpecifier declarationSpecifiers
// ParameterList : parameterList -> parameterDeclaration
// ParameterLists : parameterList -> parameterList parameterDeclaration
// ParameterTypeList : parameterTypeList -> parameterList
// ParameterVariadicTypeList : parameterTypeList -> parameterList "variadic()"
// SinglePointer : pointer -> "asterisk()" typeQualifiers
// Pointers : pointer -> "asterisk()" typeQualifiers pointer
// PostfixPrimaryExpression : postfixExpression -> primaryExpression
// PostfixExpressions : postfixExpression -> postfixExpression expression
// PostfixAssignmentExpressions : postfixExpression -> postfixExpression assignmentExpressions
// PostfixDotExpressions : postfixExpression -> postfixExpression "dot()" identifier
// PostfixArrowExpressions : postfixExpression -> postfixExpression "arrow()" identifier
// PostfixPlusExpressions : postfixExpression -> postfixExpression "plusPlus()"
// PostfixMinusExpressions : postfixExpression -> postfixExpression "minusMinus()"
// PrimaryIdentifierExpression : primaryExpression -> identifier
// PrimaryConstantExpression : primaryExpression -> constant
// PrimaryExpression : primaryExpression -> expression
// RelationalShiftExpression : relationalExpression -> shiftExpression
// RelationalLeftShiftExpression : relationalExpression -> relationalExpression "leftShift()" shiftExpression
// RelationalRightShiftExpression : relationalExpression -> relationalExpression "rightShift()" shiftExpression
// RelationalLeftEqualShiftExpression : relationalExpression -> relationalExpression "leftEqualShift()" shiftExpression
// RelationalRightEqualShiftExpression : relationalExpression -> relationalExpression "rightEqualShift()" shiftExpression
// IfStatement : selectionStatement -> "if()" expression statement
// IfElseStatement : selectionStatement -> "if()" expression statement "else()" statement
// SwitchStatement : selectionStatement -> "switch()" expression statement
// AdditiveShiftExpression : shiftExpression -> additiveExpression
// LeftShiftExpression : shiftExpression -> shiftExpression "leftShift()" additiveExpression
// RightShiftExpression : shiftExpression -> shiftExpression "rightShift()" additiveExpression
// TypeSpecifier : specifierQualifier -> typeSpecifier
// TypeQualifier : specifierQualifier -> typeQualifier
// SpecifierQualifiers : specifierQualifiers -> specifierQualifier specifierQualifiers
// StatementLabeledStatement : statement -> labeledStatement
// StatementExpressionStatement : statement -> expressionStatement
// StatementCompoundStatement : statement -> compoundStatement
// StatementSelectionStatement : statement -> selectionStatement
// StatementIterationStatement : statement -> iterationStatement
// StatementJumpStatement : statement -> jumpStatement
// Statements : statements -> statement statements
// EpsilonStatements : statements -> eps
// AutoClassSpecifier : storageClassSpecifier -> "auto()"
// RegisterClassSpecifier : storageClassSpecifier -> "register()"
// StaticClassSpecifier : storageClassSpecifier -> "static()"
// ExternClassSpecifier : storageClassSpecifier -> "extern()"
// TypedefClassSpecifier : storageClassSpecifier -> "typedef()"
// StructDeclaration : structDeclaration -> specifierQualifiers structDeclaratorList
// StructDeclarations : structDeclarations -> structDeclaration structDeclarations
// StructDeclarator : structDeclarator -> declarator
// StructDeclaratorWithExpression : structDeclarator -> declarator constantExpression
// ConstantExpression : structDeclarator -> constantExpression
// StructDeclaratorList : structDeclaratorList -> structDeclarator
// StructDeclaratorLists : structDeclaratorList -> structDeclaratorList structDeclarator
// Struct : structOrUnion -> "struct()"
// Union : structOrUnion -> "union()"
// StructOrUnionDeclarationsWithIdentifier : structOrUnionSpecifier -> structOrUnion identifier structDeclarations
// StructOrUnionDeclarations : structOrUnionSpecifier -> structOrUnion structDeclarations
// StructOrUnionIdentifier : structOrUnionSpecifier -> structOrUnion identifier
// TypeName : typeName -> specifierQualifier specifierQualifiers
// TypeNameWithAbstractDeclarator : typeName -> specifierQualifier specifierQualifiers abstractDeclarator
// ConstTypeQualifier : typeQualifier -> "const()"
// VolatileTypeQualifier : typeQualifier -> "volatile()"
// TypeQualifiers : typeQualifiers -> typeQualifier typeQualifiers
// EpsilonTypeQualifiers : typeQualifiers -> eps
// VoidTypeSpecifier : typeSpecifier -> "void()"
// CharTypeSpecifier : typeSpecifier -> "char()"
// ShortTypeSpecifier : typeSpecifier -> "short()"
// IntTypeSpecifier : typeSpecifier -> "int()"
// LongTypeSpecifier : typeSpecifier -> "long()"
// FloatTypeSpecifier : typeSpecifier -> "float()"
// DoubleTypeSpecifier : typeSpecifier -> "double()"
// SignedTypeSpecifier : typeSpecifier -> "signed()"
// UnsignedTypeSpecifier : typeSpecifier -> "unsigned()"
// StructOrUnionTypeSpecifier : typeSpecifier -> structOrUnionSpecifier
// EnumTypeSpecifier : typeSpecifier -> enumSpecifier
// NamedTypeSpecifier : typeSpecifier -> typedefName
// TypedefName : typedefName -> identifier
// UnaryPostfixExpression : unaryExpression -> postfixExpression
// UnaryPlusExpression : unaryExpression -> "plusPlus()" unaryExpression
// UnaryMinusExpression : unaryExpression -> "minusMinus()" unaryExpression
// UnaryOperatorCastExpression : unaryExpression -> unaryOperator castExpression
// UnarySizeofExpression : unaryExpression -> "sizeof()" unaryExpression
// UnarySizeofTypeNameExpression : unaryExpression -> "sizeof()" typeName
// UnaryAndOperator : unaryOperator -> "and()"
// UnaryMultiOperator : unaryOperator -> "multi()"
// UnaryPlusOperator : unaryOperator -> "plus()"
// UnaryMinusOperator : unaryOperator -> "minus()"
// UnaryComplementOperator : unaryOperator -> "complement()"
// UnaryNotOperator : unaryOperator -> "not()"
// UpdateExpression : updateExpression -> expression
// EpsilonUpdateExpression : updateExpression -> eps

///////////////////////////////////////////////////////////////////////////////

// util scripts

type Length<T extends unknown[]> = T['length']
type Prepend<Elm, T extends unknown[]> = ((
	arg: Elm,
	...rest: T
) => void) extends ((...args: infer T2) => void)
	? T2
	: never

type Rest<T extends unknown[]> = ((
	...rest: T
) => void) extends ((head: unknown, ...args: infer T2) => void)
	? T2
	: never
type Tail<T extends any[]> = ((...args: T) => any) extends ((
	_: infer First,
	...rest: infer R
) => any)
	? T extends any[] ? R : ReadonlyArray<R[number]>
	: []
declare const None: unique symbol
type None = typeof None
type Head<T extends unknown[]> = Length<T> extends 0 ? None : T[0]
type AddUnknownNodeRest<Tuple extends Node[], Result extends Node[] = [...Node[]]> = {
	empty: Result,
	nonEmpty: ((..._: Tuple) => Node) extends ((_: infer First, ..._1: infer Next) => Node)
		? Prepend<First, AddUnknownNodeRest<Rest<Tuple>, Result>>
		: never
}[
	Tuple extends [unknown, ...unknown[]]
		? 'nonEmpty'
		: 'empty'
]

type CompareLength<Left extends any[], Right extends any[]> = {
	fitBoth: 'equal'
	fitLeft: 'shorterLeft'
	fitRight: 'shorterRight'
	unfit: ((..._: Left) => any) extends ((_: any, ..._1: infer LeftRest) => any) ?
		 ((..._: Right) => any) extends ((_: any, ..._1: infer RightRest) => any) ?
					CompareLength<LeftRest, RightRest>
			: never
			: never
}[
	Left['length'] extends Right['length'] ? 'fitBoth' :
	Left extends [] ? 'fitLeft' :
	Right extends [] ? 'fitRight' :
	'unfit'
]

type StartsWith<Tuple extends unknown[], Tuple2 extends unknown[]> = {
	false: 0,
	empty: 1,
	nonEmpty: Head<Tuple> extends Head<Tuple2>
		? StartsWith<Rest<Tuple>, Rest<Tuple2>>
		: 0
}[
	CompareLength<Tuple, Tuple2> extends 'shorterLeft'
		? 'false'
		: IsFinite<Tuple2, 'finite', 'infinite'> extends 'infinite'
			? 'false'
			: Tuple2 extends [unknown, ...unknown[]]
				? 'nonEmpty'
				: 'empty'
]
type IsFinite<Tuple extends unknown[], Finite, Infinite> = {
	empty: Finite
	nonEmpty: ((..._: Tuple) => unknown) extends ((_: infer First, ..._1: infer Rest) => unknown)
		? IsFinite<Rest, Finite, Infinite>
		: never
	infinite: Infinite
}[
	Tuple extends [] ? 'empty' :
	Tuple extends (infer Element)[] ?
	Element[] extends Tuple ?
		'infinite'
	: 'nonEmpty'
	: never
]

///////////////////////////////////////////////////////////////////////////////

// AST nodes

interface Unit {
	accept(v? : Visitor): void
}

interface AbstractDeclarator {
	accept(v? : Visitor): void
}

interface AdditiveExpression {
	accept(v? : Visitor): void
}

interface AndExpression {
	accept(v? : Visitor): void
}

interface AssignmentExpression {
	accept(v? : Visitor): void
}

interface AssignmentExpressions {
	accept(v? : Visitor): void
}

interface AssignmentOperator {
	accept(v? : Visitor): void
}

interface CastExpression {
	accept(v? : Visitor): void
}

interface CompoundStatement {
	accept(v? : Visitor): void
}

interface ConditionExpression {
	accept(v? : Visitor): void
}

interface ConditionalExpression {
	accept(v? : Visitor): void
}

interface Constant {
	accept(v? : Visitor): void
}

interface ConstantExpression {
	accept(v? : Visitor): void
}

interface DeclExpression {
	accept(v? : Visitor): void
}

interface Declaration {
	accept(v? : Visitor): void
}

interface DeclarationSpecifier {
	accept(v? : Visitor): void
}

interface DeclarationSpecifiers {
	accept(v? : Visitor): void
}

interface Declarations {
	accept(v? : Visitor): void
}

interface Declarator {
	accept(v? : Visitor): void
}

interface DirectAbstractDeclarator {
	accept(v? : Visitor): void
}

interface DirectDeclarator {
	accept(v? : Visitor): void
}

interface EnumSpecifier {
	accept(v? : Visitor): void
}

interface Enumerator {
	accept(v? : Visitor): void
}

interface EnumeratorList {
	accept(v? : Visitor): void
}

interface EqualityExpression {
	accept(v? : Visitor): void
}

interface ExclusiveOrExpression {
	accept(v? : Visitor): void
}

interface Expression {
	accept(v? : Visitor): void
}

interface ExpressionStatement {
	accept(v? : Visitor): void
}

interface ExternalDeclaration {
	accept(v? : Visitor): void
}

interface ExternalDeclarations {
	accept(v? : Visitor): void
}

interface FunctionDefinition {
	accept(v? : Visitor): void
}

interface Identifier {
	accept(v? : Visitor): void
}

interface Identifiers {
	accept(v? : Visitor): void
}

interface InclusiveOrExpression {
	accept(v? : Visitor): void
}

interface InitDeclarator {
	accept(v? : Visitor): void
}

interface InitDeclarators {
	accept(v? : Visitor): void
}

interface Initializer {
	accept(v? : Visitor): void
}

interface InitializerList {
	accept(v? : Visitor): void
}

interface IterationStatement {
	accept(v? : Visitor): void
}

interface JumpStatement {
	accept(v? : Visitor): void
}

interface LabeledStatement {
	accept(v? : Visitor): void
}

interface LogicalAndExpression {
	accept(v? : Visitor): void
}

interface LogicalOrExpression {
	accept(v? : Visitor): void
}

interface MultiplicativeExpression {
	accept(v? : Visitor): void
}

interface ParameterDeclaration {
	accept(v? : Visitor): void
}

interface ParameterList {
	accept(v? : Visitor): void
}

interface ParameterTypeList {
	accept(v? : Visitor): void
}

interface Pointer {
	accept(v? : Visitor): void
}

interface PostfixExpression {
	accept(v? : Visitor): void
}

interface PrimaryExpression {
	accept(v? : Visitor): void
}

interface RelationalExpression {
	accept(v? : Visitor): void
}

interface SelectionStatement {
	accept(v? : Visitor): void
}

interface ShiftExpression {
	accept(v? : Visitor): void
}

interface SpecifierQualifier {
	accept(v? : Visitor): void
}

interface SpecifierQualifiers {
	accept(v? : Visitor): void
}

interface Statement {
	accept(v? : Visitor): void
}

interface Statements {
	accept(v? : Visitor): void
}

interface StorageClassSpecifier {
	accept(v? : Visitor): void
}

interface StructDeclaration {
	accept(v? : Visitor): void
}

interface StructDeclarations {
	accept(v? : Visitor): void
}

interface StructDeclarator {
	accept(v? : Visitor): void
}

interface StructDeclaratorList {
	accept(v? : Visitor): void
}

interface StructOrUnion {
	accept(v? : Visitor): void
}

interface StructOrUnionSpecifier {
	accept(v? : Visitor): void
}

interface TypeName {
	accept(v? : Visitor): void
}

interface TypeQualifier {
	accept(v? : Visitor): void
}

interface TypeQualifiers {
	accept(v? : Visitor): void
}

interface TypeSpecifier {
	accept(v? : Visitor): void
}

interface TypedefName {
	accept(v? : Visitor): void
}

interface UnaryExpression {
	accept(v? : Visitor): void
}

interface UnaryOperator {
	accept(v? : Visitor): void
}

interface UpdateExpression {
	accept(v? : Visitor): void
}

interface Eps {
	accept(v? : Visitor): void
}

interface EnumerationConstant {
	accept(v? : Visitor): void
}

export class TranslationUnit implements Unit {
	arg1 : ExternalDeclarations
	constructor(arg1 : ExternalDeclarations) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTranslationUnit(this)
		} else {
			new DefaultVisitor().visitTranslationUnit(this)
		}
	}
}

export class AbstractPointerDeclarator implements AbstractDeclarator {
	arg1 : Pointer
	constructor(arg1 : Pointer) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAbstractPointerDeclarator(this)
		} else {
			new DefaultVisitor().visitAbstractPointerDeclarator(this)
		}
	}
}

export class AbstractPointerDirectDeclarator implements AbstractDeclarator {
	arg1 : Pointer
	arg2 : DirectAbstractDeclarator
	constructor(arg1 : Pointer, arg2 : DirectAbstractDeclarator) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAbstractPointerDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitAbstractPointerDirectDeclarator(this)
		}
	}
}

export class AbstractDirectDeclarator implements AbstractDeclarator {
	arg1 : DirectAbstractDeclarator
	constructor(arg1 : DirectAbstractDeclarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAbstractDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitAbstractDirectDeclarator(this)
		}
	}
}

export class MultiplicativeAdditiveExpression implements AdditiveExpression {
	arg1 : MultiplicativeExpression
	constructor(arg1 : MultiplicativeExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitMultiplicativeAdditiveExpression(this)
		} else {
			new DefaultVisitor().visitMultiplicativeAdditiveExpression(this)
		}
	}
}

export class AdditivePlusExpression implements AdditiveExpression {
	arg1 : AdditiveExpression
	arg2 : MultiplicativeExpression
	constructor(arg1 : AdditiveExpression, arg2 : MultiplicativeExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAdditivePlusExpression(this)
		} else {
			new DefaultVisitor().visitAdditivePlusExpression(this)
		}
	}
}

export class AdditiveMinusExpression implements AdditiveExpression {
	arg1 : AdditiveExpression
	arg2 : MultiplicativeExpression
	constructor(arg1 : AdditiveExpression, arg2 : MultiplicativeExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAdditiveMinusExpression(this)
		} else {
			new DefaultVisitor().visitAdditiveMinusExpression(this)
		}
	}
}

export class EqualityAndExpression implements AndExpression {
	arg1 : EqualityExpression
	constructor(arg1 : EqualityExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEqualityAndExpression(this)
		} else {
			new DefaultVisitor().visitEqualityAndExpression(this)
		}
	}
}

export class EqualityAndExpressions implements AndExpression {
	arg1 : AndExpression
	arg2 : EqualityExpression
	constructor(arg1 : AndExpression, arg2 : EqualityExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEqualityAndExpressions(this)
		} else {
			new DefaultVisitor().visitEqualityAndExpressions(this)
		}
	}
}

export class ConditionalAssignmentExpression implements AssignmentExpression {
	arg1 : ConditionalExpression
	constructor(arg1 : ConditionalExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConditionalAssignmentExpression(this)
		} else {
			new DefaultVisitor().visitConditionalAssignmentExpression(this)
		}
	}
}

export class AssignmentExpressions implements AssignmentExpression {
	arg1 : UnaryExpression
	arg2 : AssignmentOperator
	arg3 : AssignmentExpression
	constructor(arg1 : UnaryExpression, arg2 : AssignmentOperator, arg3 : AssignmentExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentExpressions(this)
		} else {
			new DefaultVisitor().visitAssignmentExpressions(this)
		}
	}
}

export class AssignmentExpressions implements AssignmentExpressions {
	arg1 : AssignmentExpression
	arg2 : AssignmentExpressions
	constructor(arg1 : AssignmentExpression, arg2 : AssignmentExpressions) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentExpressions(this)
		} else {
			new DefaultVisitor().visitAssignmentExpressions(this)
		}
	}
}

export class AssignmentExpressions implements AssignmentExpressions {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentExpressions(this)
		} else {
			new DefaultVisitor().visitAssignmentExpressions(this)
		}
	}
}

export class AssignmentEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentEqualOperator(this)
		}
	}
}

export class AssignmentMultiEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentMultiEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentMultiEqualOperator(this)
		}
	}
}

export class AssignmentDivEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentDivEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentDivEqualOperator(this)
		}
	}
}

export class AssignmentPercentEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentPercentEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentPercentEqualOperator(this)
		}
	}
}

export class AssignmentPlusEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentPlusEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentPlusEqualOperator(this)
		}
	}
}

export class AssignmentMinuxEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentMinuxEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentMinuxEqualOperator(this)
		}
	}
}

export class AssignmentLeftShiftOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentLeftShiftOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentLeftShiftOperator(this)
		}
	}
}

export class AssignmentRightShiftOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentRightShiftOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentRightShiftOperator(this)
		}
	}
}

export class AssignmentAndEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentAndEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentAndEqualOperator(this)
		}
	}
}

export class AssignmentXorEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentXorEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentXorEqualOperator(this)
		}
	}
}

export class AssignmentOrEqualOperator implements AssignmentOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentOrEqualOperator(this)
		} else {
			new DefaultVisitor().visitAssignmentOrEqualOperator(this)
		}
	}
}

export class CastExpression implements CastExpression {
	arg1 : UnaryExpression
	constructor(arg1 : UnaryExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitCastExpression(this)
		} else {
			new DefaultVisitor().visitCastExpression(this)
		}
	}
}

export class CastExpressions implements CastExpression {
	arg1 : TypeName
	arg2 : CastExpression
	constructor(arg1 : TypeName, arg2 : CastExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitCastExpressions(this)
		} else {
			new DefaultVisitor().visitCastExpressions(this)
		}
	}
}

export class CompoundStatement implements CompoundStatement {
	arg1 : Declarations
	arg2 : Statements
	constructor(arg1 : Declarations, arg2 : Statements) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitCompoundStatement(this)
		} else {
			new DefaultVisitor().visitCompoundStatement(this)
		}
	}
}

export class ConditionExpression implements ConditionExpression {
	arg1 : Expression
	constructor(arg1 : Expression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConditionExpression(this)
		} else {
			new DefaultVisitor().visitConditionExpression(this)
		}
	}
}

export class EpsilonConditionExpression implements ConditionExpression {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonConditionExpression(this)
		} else {
			new DefaultVisitor().visitEpsilonConditionExpression(this)
		}
	}
}

export class ConditionalLogicalOrExpression implements ConditionalExpression {
	arg1 : LogicalOrExpression
	constructor(arg1 : LogicalOrExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConditionalLogicalOrExpression(this)
		} else {
			new DefaultVisitor().visitConditionalLogicalOrExpression(this)
		}
	}
}

export class ConditionalLogicalOrExpressions implements ConditionalExpression {
	arg1 : LogicalOrExpression
	arg2 : Expression
	arg3 : ConditionalExpression
	constructor(arg1 : LogicalOrExpression, arg2 : Expression, arg3 : ConditionalExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConditionalLogicalOrExpressions(this)
		} else {
			new DefaultVisitor().visitConditionalLogicalOrExpressions(this)
		}
	}
}

export class ConstantInteger implements Constant {
	arg1 : number
	constructor(arg1 : number) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConstantInteger(this)
		} else {
			new DefaultVisitor().visitConstantInteger(this)
		}
	}
}

export class ConstantString implements Constant {
	arg1 : string
	constructor(arg1 : string) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConstantString(this)
		} else {
			new DefaultVisitor().visitConstantString(this)
		}
	}
}

export class ConstantFloat implements Constant {
	arg1 : number
	constructor(arg1 : number) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConstantFloat(this)
		} else {
			new DefaultVisitor().visitConstantFloat(this)
		}
	}
}

export class ConstantEnum implements Constant {
	arg1 : EnumerationConstant
	constructor(arg1 : EnumerationConstant) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConstantEnum(this)
		} else {
			new DefaultVisitor().visitConstantEnum(this)
		}
	}
}

export class ConditionalConstantExpression implements ConstantExpression {
	arg1 : ConditionalExpression
	constructor(arg1 : ConditionalExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConditionalConstantExpression(this)
		} else {
			new DefaultVisitor().visitConditionalConstantExpression(this)
		}
	}
}

export class DeclExpression implements DeclExpression {
	arg1 : Expression
	constructor(arg1 : Expression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDeclExpression(this)
		} else {
			new DefaultVisitor().visitDeclExpression(this)
		}
	}
}

export class EpsilonDeclExpression implements DeclExpression {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonDeclExpression(this)
		} else {
			new DefaultVisitor().visitEpsilonDeclExpression(this)
		}
	}
}

export class Declaration implements Declaration {
	arg1 : DeclarationSpecifier
	arg2 : DeclarationSpecifiers
	arg3 : InitDeclarators
	constructor(arg1 : DeclarationSpecifier, arg2 : DeclarationSpecifiers, arg3 : InitDeclarators) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDeclaration(this)
		} else {
			new DefaultVisitor().visitDeclaration(this)
		}
	}
}

export class StorageDeclarationSpecifier implements DeclarationSpecifier {
	arg1 : StorageClassSpecifier
	constructor(arg1 : StorageClassSpecifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStorageDeclarationSpecifier(this)
		} else {
			new DefaultVisitor().visitStorageDeclarationSpecifier(this)
		}
	}
}

export class TypeDeclarationSpecifier implements DeclarationSpecifier {
	arg1 : TypeSpecifier
	constructor(arg1 : TypeSpecifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTypeDeclarationSpecifier(this)
		} else {
			new DefaultVisitor().visitTypeDeclarationSpecifier(this)
		}
	}
}

export class TypeQualifierDeclarationSpecifier implements DeclarationSpecifier {
	arg1 : TypeQualifier
	constructor(arg1 : TypeQualifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTypeQualifierDeclarationSpecifier(this)
		} else {
			new DefaultVisitor().visitTypeQualifierDeclarationSpecifier(this)
		}
	}
}

export class DeclarationSpecifiers implements DeclarationSpecifiers {
	arg1 : DeclarationSpecifiers
	arg2 : DeclarationSpecifier
	constructor(arg1 : DeclarationSpecifiers, arg2 : DeclarationSpecifier) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDeclarationSpecifiers(this)
		} else {
			new DefaultVisitor().visitDeclarationSpecifiers(this)
		}
	}
}

export class EpsilonDeclarationSpecifiers implements DeclarationSpecifiers {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonDeclarationSpecifiers(this)
		} else {
			new DefaultVisitor().visitEpsilonDeclarationSpecifiers(this)
		}
	}
}

export class Declarations implements Declarations {
	arg1 : Declarations
	arg2 : Declaration
	constructor(arg1 : Declarations, arg2 : Declaration) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDeclarations(this)
		} else {
			new DefaultVisitor().visitDeclarations(this)
		}
	}
}

export class EpsilonDeclarations implements Declarations {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonDeclarations(this)
		} else {
			new DefaultVisitor().visitEpsilonDeclarations(this)
		}
	}
}

export class PointerDeclarator implements Declarator {
	arg1 : Pointer
	arg2 : DirectDeclarator
	constructor(arg1 : Pointer, arg2 : DirectDeclarator) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPointerDeclarator(this)
		} else {
			new DefaultVisitor().visitPointerDeclarator(this)
		}
	}
}

export class DirectDeclarator implements Declarator {
	arg1 : DirectDeclarator
	constructor(arg1 : DirectDeclarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitDirectDeclarator(this)
		}
	}
}

export class DirectAbstractDeclarator implements DirectAbstractDeclarator {
	arg1 : AbstractDeclarator
	constructor(arg1 : AbstractDeclarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectAbstractDeclarator(this)
		} else {
			new DefaultVisitor().visitDirectAbstractDeclarator(this)
		}
	}
}

export class DirectConstantAbstractDeclarator implements DirectAbstractDeclarator {
	arg1 : ConstantExpression
	constructor(arg1 : ConstantExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectConstantAbstractDeclarator(this)
		} else {
			new DefaultVisitor().visitDirectConstantAbstractDeclarator(this)
		}
	}
}

export class DirectConstantAbstractDeclarators implements DirectAbstractDeclarator {
	arg1 : DirectAbstractDeclarator
	arg2 : ConstantExpression
	constructor(arg1 : DirectAbstractDeclarator, arg2 : ConstantExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectConstantAbstractDeclarators(this)
		} else {
			new DefaultVisitor().visitDirectConstantAbstractDeclarators(this)
		}
	}
}

export class DirectIndexAbstractDeclarator implements DirectAbstractDeclarator {
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectIndexAbstractDeclarator(this)
		} else {
			new DefaultVisitor().visitDirectIndexAbstractDeclarator(this)
		}
	}
}

export class DirectNoIndexAbstractDeclarator implements DirectAbstractDeclarator {
	arg1 : DirectAbstractDeclarator
	constructor(arg1 : DirectAbstractDeclarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectNoIndexAbstractDeclarator(this)
		} else {
			new DefaultVisitor().visitDirectNoIndexAbstractDeclarator(this)
		}
	}
}

export class DirectParameterTypeListAbstractDeclarator implements DirectAbstractDeclarator {
	arg1 : ParameterTypeList
	constructor(arg1 : ParameterTypeList) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectParameterTypeListAbstractDeclarator(this)
		} else {
			new DefaultVisitor().visitDirectParameterTypeListAbstractDeclarator(this)
		}
	}
}

export class DirectParameterTypeListAbstractDeclarators implements DirectAbstractDeclarator {
	arg1 : DirectAbstractDeclarator
	arg2 : ParameterTypeList
	constructor(arg1 : DirectAbstractDeclarator, arg2 : ParameterTypeList) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectParameterTypeListAbstractDeclarators(this)
		} else {
			new DefaultVisitor().visitDirectParameterTypeListAbstractDeclarators(this)
		}
	}
}

export class DirectParamAbstractDeclarator implements DirectAbstractDeclarator {
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectParamAbstractDeclarator(this)
		} else {
			new DefaultVisitor().visitDirectParamAbstractDeclarator(this)
		}
	}
}

export class DirectNoParamAbstractDeclarator implements DirectAbstractDeclarator {
	arg1 : DirectAbstractDeclarator
	constructor(arg1 : DirectAbstractDeclarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDirectNoParamAbstractDeclarator(this)
		} else {
			new DefaultVisitor().visitDirectNoParamAbstractDeclarator(this)
		}
	}
}

export class IdentifierDirectDeclarator implements DirectDeclarator {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitIdentifierDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitIdentifierDirectDeclarator(this)
		}
	}
}

export class DeclaratorDirectDeclarator implements DirectDeclarator {
	arg1 : Declarator
	constructor(arg1 : Declarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDeclaratorDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitDeclaratorDirectDeclarator(this)
		}
	}
}

export class SquareConstantDirectDeclarator implements DirectDeclarator {
	arg1 : DirectDeclarator
	arg2 : ConstantExpression
	constructor(arg1 : DirectDeclarator, arg2 : ConstantExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitSquareConstantDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitSquareConstantDirectDeclarator(this)
		}
	}
}

export class SquareDirectDeclarator implements DirectDeclarator {
	arg1 : DirectDeclarator
	constructor(arg1 : DirectDeclarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitSquareDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitSquareDirectDeclarator(this)
		}
	}
}

export class CurlyParameterDirectDeclarator implements DirectDeclarator {
	arg1 : DirectDeclarator
	arg2 : ParameterTypeList
	constructor(arg1 : DirectDeclarator, arg2 : ParameterTypeList) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitCurlyParameterDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitCurlyParameterDirectDeclarator(this)
		}
	}
}

export class CurlyDirectDeclarator implements DirectDeclarator {
	arg1 : Identifiers
	constructor(arg1 : Identifiers) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitCurlyDirectDeclarator(this)
		} else {
			new DefaultVisitor().visitCurlyDirectDeclarator(this)
		}
	}
}

export class EnumIdentifierListSpecifier implements EnumSpecifier {
	arg1 : Identifier
	arg2 : EnumeratorList
	constructor(arg1 : Identifier, arg2 : EnumeratorList) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEnumIdentifierListSpecifier(this)
		} else {
			new DefaultVisitor().visitEnumIdentifierListSpecifier(this)
		}
	}
}

export class EnumListSpecifier implements EnumSpecifier {
	arg1 : EnumeratorList
	constructor(arg1 : EnumeratorList) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEnumListSpecifier(this)
		} else {
			new DefaultVisitor().visitEnumListSpecifier(this)
		}
	}
}

export class EnumIdentifierSpecifier implements EnumSpecifier {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEnumIdentifierSpecifier(this)
		} else {
			new DefaultVisitor().visitEnumIdentifierSpecifier(this)
		}
	}
}

export class EnumeratorIdentifier implements Enumerator {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEnumeratorIdentifier(this)
		} else {
			new DefaultVisitor().visitEnumeratorIdentifier(this)
		}
	}
}

export class EnumeratorList implements EnumeratorList {
	arg1 : Enumerator
	constructor(arg1 : Enumerator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEnumeratorList(this)
		} else {
			new DefaultVisitor().visitEnumeratorList(this)
		}
	}
}

export class EnumeratorLists implements EnumeratorList {
	arg1 : EnumeratorList
	arg2 : Enumerator
	constructor(arg1 : EnumeratorList, arg2 : Enumerator) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEnumeratorLists(this)
		} else {
			new DefaultVisitor().visitEnumeratorLists(this)
		}
	}
}

export class RelationalEqualityExpression implements EqualityExpression {
	arg1 : RelationalExpression
	constructor(arg1 : RelationalExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitRelationalEqualityExpression(this)
		} else {
			new DefaultVisitor().visitRelationalEqualityExpression(this)
		}
	}
}

export class EqualityExpression implements EqualityExpression {
	arg1 : EqualityExpression
	arg2 : RelationalExpression
	constructor(arg1 : EqualityExpression, arg2 : RelationalExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEqualityExpression(this)
		} else {
			new DefaultVisitor().visitEqualityExpression(this)
		}
	}
}

export class NotEqualityExpression implements EqualityExpression {
	arg1 : EqualityExpression
	arg2 : RelationalExpression
	constructor(arg1 : EqualityExpression, arg2 : RelationalExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitNotEqualityExpression(this)
		} else {
			new DefaultVisitor().visitNotEqualityExpression(this)
		}
	}
}

export class ExclusiveOrAndExpression implements ExclusiveOrExpression {
	arg1 : AndExpression
	constructor(arg1 : AndExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitExclusiveOrAndExpression(this)
		} else {
			new DefaultVisitor().visitExclusiveOrAndExpression(this)
		}
	}
}

export class ExclusiveOrAndExpressions implements ExclusiveOrExpression {
	arg1 : ExclusiveOrExpression
	arg2 : AndExpression
	constructor(arg1 : ExclusiveOrExpression, arg2 : AndExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitExclusiveOrAndExpressions(this)
		} else {
			new DefaultVisitor().visitExclusiveOrAndExpressions(this)
		}
	}
}

export class ExpressionAssignmentExpression implements Expression {
	arg1 : AssignmentExpression
	constructor(arg1 : AssignmentExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitExpressionAssignmentExpression(this)
		} else {
			new DefaultVisitor().visitExpressionAssignmentExpression(this)
		}
	}
}

export class ExpressionAssignmentExpressions implements Expression {
	arg1 : Expression
	arg2 : AssignmentExpression
	constructor(arg1 : Expression, arg2 : AssignmentExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitExpressionAssignmentExpressions(this)
		} else {
			new DefaultVisitor().visitExpressionAssignmentExpressions(this)
		}
	}
}

export class ExpressionStatement implements ExpressionStatement {
	arg1 : Expression
	constructor(arg1 : Expression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitExpressionStatement(this)
		} else {
			new DefaultVisitor().visitExpressionStatement(this)
		}
	}
}

export class EpsilonExpressionStatement implements ExpressionStatement {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonExpressionStatement(this)
		} else {
			new DefaultVisitor().visitEpsilonExpressionStatement(this)
		}
	}
}

export class FunctionExternalDeclaration implements ExternalDeclaration {
	arg1 : FunctionDefinition
	constructor(arg1 : FunctionDefinition) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitFunctionExternalDeclaration(this)
		} else {
			new DefaultVisitor().visitFunctionExternalDeclaration(this)
		}
	}
}

export class ExternalDeclaration implements ExternalDeclaration {
	arg1 : Declaration
	constructor(arg1 : Declaration) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitExternalDeclaration(this)
		} else {
			new DefaultVisitor().visitExternalDeclaration(this)
		}
	}
}

export class ExternalDeclarations implements ExternalDeclarations {
	arg1 : ExternalDeclaration
	arg2 : ExternalDeclarations
	constructor(arg1 : ExternalDeclaration, arg2 : ExternalDeclarations) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitExternalDeclarations(this)
		} else {
			new DefaultVisitor().visitExternalDeclarations(this)
		}
	}
}

export class EpsilonExternalDeclarations implements ExternalDeclarations {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonExternalDeclarations(this)
		} else {
			new DefaultVisitor().visitEpsilonExternalDeclarations(this)
		}
	}
}

export class FunctionDefinition implements FunctionDefinition {
	arg1 : DeclarationSpecifiers
	arg2 : Declarator
	arg3 : Declarations
	arg4 : CompoundStatement
	constructor(arg1 : DeclarationSpecifiers, arg2 : Declarator, arg3 : Declarations, arg4 : CompoundStatement) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
		this.arg4 = arg4
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitFunctionDefinition(this)
		} else {
			new DefaultVisitor().visitFunctionDefinition(this)
		}
	}
}

export class Identifier implements Identifier {
	arg1 : ConstantExpression
	constructor(arg1 : ConstantExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitIdentifier(this)
		} else {
			new DefaultVisitor().visitIdentifier(this)
		}
	}
}

export class Identifiers implements Identifiers {
	arg1 : Identifier
	arg2 : Identifiers
	constructor(arg1 : Identifier, arg2 : Identifiers) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitIdentifiers(this)
		} else {
			new DefaultVisitor().visitIdentifiers(this)
		}
	}
}

export class EpsilonIdentifiers implements Identifiers {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonIdentifiers(this)
		} else {
			new DefaultVisitor().visitEpsilonIdentifiers(this)
		}
	}
}

export class InclusiveOrExclusiveOrExpression implements InclusiveOrExpression {
	arg1 : ExclusiveOrExpression
	constructor(arg1 : ExclusiveOrExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitInclusiveOrExclusiveOrExpression(this)
		} else {
			new DefaultVisitor().visitInclusiveOrExclusiveOrExpression(this)
		}
	}
}

export class InclusiveOrExclusiveOrExpression implements InclusiveOrExpression {
	arg1 : InclusiveOrExpression
	arg2 : ExclusiveOrExpression
	constructor(arg1 : InclusiveOrExpression, arg2 : ExclusiveOrExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitInclusiveOrExclusiveOrExpression(this)
		} else {
			new DefaultVisitor().visitInclusiveOrExclusiveOrExpression(this)
		}
	}
}

export class InitDeclarator implements InitDeclarator {
	arg1 : Declarator
	constructor(arg1 : Declarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitInitDeclarator(this)
		} else {
			new DefaultVisitor().visitInitDeclarator(this)
		}
	}
}

export class InitInitializerDeclarator implements InitDeclarator {
	arg1 : Declarator
	arg2 : Initializer
	constructor(arg1 : Declarator, arg2 : Initializer) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitInitInitializerDeclarator(this)
		} else {
			new DefaultVisitor().visitInitInitializerDeclarator(this)
		}
	}
}

export class InitDeclarators implements InitDeclarators {
	arg1 : InitDeclarators
	arg2 : InitDeclarator
	constructor(arg1 : InitDeclarators, arg2 : InitDeclarator) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitInitDeclarators(this)
		} else {
			new DefaultVisitor().visitInitDeclarators(this)
		}
	}
}

export class EpsilonInitDeclarators implements InitDeclarators {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonInitDeclarators(this)
		} else {
			new DefaultVisitor().visitEpsilonInitDeclarators(this)
		}
	}
}

export class AssignmentInitializer implements Initializer {
	arg1 : AssignmentExpression
	constructor(arg1 : AssignmentExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAssignmentInitializer(this)
		} else {
			new DefaultVisitor().visitAssignmentInitializer(this)
		}
	}
}

export class Initializer implements Initializer {
	arg1 : InitializerList
	constructor(arg1 : InitializerList) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitInitializer(this)
		} else {
			new DefaultVisitor().visitInitializer(this)
		}
	}
}

export class InitializerList implements InitializerList {
	arg1 : Initializer
	constructor(arg1 : Initializer) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitInitializerList(this)
		} else {
			new DefaultVisitor().visitInitializerList(this)
		}
	}
}

export class InitializerLists implements InitializerList {
	arg1 : InitializerList
	arg2 : Initializer
	constructor(arg1 : InitializerList, arg2 : Initializer) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitInitializerLists(this)
		} else {
			new DefaultVisitor().visitInitializerLists(this)
		}
	}
}

export class WhileStatement implements IterationStatement {
	arg1 : Expression
	arg2 : Statement
	constructor(arg1 : Expression, arg2 : Statement) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitWhileStatement(this)
		} else {
			new DefaultVisitor().visitWhileStatement(this)
		}
	}
}

export class DoWhileStatement implements IterationStatement {
	arg1 : Statement
	arg2 : Expression
	constructor(arg1 : Statement, arg2 : Expression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDoWhileStatement(this)
		} else {
			new DefaultVisitor().visitDoWhileStatement(this)
		}
	}
}

export class ForStatement implements IterationStatement {
	arg1 : DeclExpression
	arg2 : ConditionExpression
	arg3 : UpdateExpression
	arg4 : Statement
	constructor(arg1 : DeclExpression, arg2 : ConditionExpression, arg3 : UpdateExpression, arg4 : Statement) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
		this.arg4 = arg4
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitForStatement(this)
		} else {
			new DefaultVisitor().visitForStatement(this)
		}
	}
}

export class GotoStatement implements JumpStatement {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitGotoStatement(this)
		} else {
			new DefaultVisitor().visitGotoStatement(this)
		}
	}
}

export class ContinueStatement implements JumpStatement {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitContinueStatement(this)
		} else {
			new DefaultVisitor().visitContinueStatement(this)
		}
	}
}

export class BreakStatement implements JumpStatement {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitBreakStatement(this)
		} else {
			new DefaultVisitor().visitBreakStatement(this)
		}
	}
}

export class ReturnStatement implements JumpStatement {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitReturnStatement(this)
		} else {
			new DefaultVisitor().visitReturnStatement(this)
		}
	}
}

export class LabeledStatement implements LabeledStatement {
	arg1 : Identifier
	arg2 : Statement
	constructor(arg1 : Identifier, arg2 : Statement) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitLabeledStatement(this)
		} else {
			new DefaultVisitor().visitLabeledStatement(this)
		}
	}
}

export class CaseStatement implements LabeledStatement {
	arg1 : ConstantExpression
	arg2 : Statement
	constructor(arg1 : ConstantExpression, arg2 : Statement) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitCaseStatement(this)
		} else {
			new DefaultVisitor().visitCaseStatement(this)
		}
	}
}

export class DefaultStatement implements LabeledStatement {
	arg1 : Statement
	constructor(arg1 : Statement) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDefaultStatement(this)
		} else {
			new DefaultVisitor().visitDefaultStatement(this)
		}
	}
}

export class LogicalAndInclusiveOrExpression implements LogicalAndExpression {
	arg1 : InclusiveOrExpression
	constructor(arg1 : InclusiveOrExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitLogicalAndInclusiveOrExpression(this)
		} else {
			new DefaultVisitor().visitLogicalAndInclusiveOrExpression(this)
		}
	}
}

export class LogicalAndAndInclusiveOrExpression implements LogicalAndExpression {
	arg1 : LogicalAndExpression
	arg2 : InclusiveOrExpression
	constructor(arg1 : LogicalAndExpression, arg2 : InclusiveOrExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitLogicalAndAndInclusiveOrExpression(this)
		} else {
			new DefaultVisitor().visitLogicalAndAndInclusiveOrExpression(this)
		}
	}
}

export class LogicalOrAndExpression implements LogicalOrExpression {
	arg1 : LogicalAndExpression
	constructor(arg1 : LogicalAndExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitLogicalOrAndExpression(this)
		} else {
			new DefaultVisitor().visitLogicalOrAndExpression(this)
		}
	}
}

export class LogicalOrOrAndExpression implements LogicalOrExpression {
	arg1 : LogicalOrExpression
	arg2 : LogicalAndExpression
	constructor(arg1 : LogicalOrExpression, arg2 : LogicalAndExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitLogicalOrOrAndExpression(this)
		} else {
			new DefaultVisitor().visitLogicalOrOrAndExpression(this)
		}
	}
}

export class MultiplicativeCastExpression implements MultiplicativeExpression {
	arg1 : CastExpression
	constructor(arg1 : CastExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitMultiplicativeCastExpression(this)
		} else {
			new DefaultVisitor().visitMultiplicativeCastExpression(this)
		}
	}
}

export class MultiMultiplicativeExpression implements MultiplicativeExpression {
	arg1 : MultiplicativeExpression
	arg2 : CastExpression
	constructor(arg1 : MultiplicativeExpression, arg2 : CastExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitMultiMultiplicativeExpression(this)
		} else {
			new DefaultVisitor().visitMultiMultiplicativeExpression(this)
		}
	}
}

export class DivMultiplicativeExpression implements MultiplicativeExpression {
	arg1 : MultiplicativeExpression
	arg2 : CastExpression
	constructor(arg1 : MultiplicativeExpression, arg2 : CastExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDivMultiplicativeExpression(this)
		} else {
			new DefaultVisitor().visitDivMultiplicativeExpression(this)
		}
	}
}

export class PercentMultiplicativeExpression implements MultiplicativeExpression {
	arg1 : MultiplicativeExpression
	arg2 : CastExpression
	constructor(arg1 : MultiplicativeExpression, arg2 : CastExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPercentMultiplicativeExpression(this)
		} else {
			new DefaultVisitor().visitPercentMultiplicativeExpression(this)
		}
	}
}

export class DeclaratorParameterDeclaration implements ParameterDeclaration {
	arg1 : DeclarationSpecifier
	arg2 : DeclarationSpecifiers
	arg3 : Declarator
	constructor(arg1 : DeclarationSpecifier, arg2 : DeclarationSpecifiers, arg3 : Declarator) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitDeclaratorParameterDeclaration(this)
		} else {
			new DefaultVisitor().visitDeclaratorParameterDeclaration(this)
		}
	}
}

export class AbstractParameterDeclaration implements ParameterDeclaration {
	arg1 : DeclarationSpecifier
	arg2 : DeclarationSpecifiers
	arg3 : AbstractDeclarator
	constructor(arg1 : DeclarationSpecifier, arg2 : DeclarationSpecifiers, arg3 : AbstractDeclarator) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAbstractParameterDeclaration(this)
		} else {
			new DefaultVisitor().visitAbstractParameterDeclaration(this)
		}
	}
}

export class ParameterDeclaration implements ParameterDeclaration {
	arg1 : DeclarationSpecifier
	arg2 : DeclarationSpecifiers
	constructor(arg1 : DeclarationSpecifier, arg2 : DeclarationSpecifiers) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitParameterDeclaration(this)
		} else {
			new DefaultVisitor().visitParameterDeclaration(this)
		}
	}
}

export class ParameterList implements ParameterList {
	arg1 : ParameterDeclaration
	constructor(arg1 : ParameterDeclaration) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitParameterList(this)
		} else {
			new DefaultVisitor().visitParameterList(this)
		}
	}
}

export class ParameterLists implements ParameterList {
	arg1 : ParameterList
	arg2 : ParameterDeclaration
	constructor(arg1 : ParameterList, arg2 : ParameterDeclaration) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitParameterLists(this)
		} else {
			new DefaultVisitor().visitParameterLists(this)
		}
	}
}

export class ParameterTypeList implements ParameterTypeList {
	arg1 : ParameterList
	constructor(arg1 : ParameterList) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitParameterTypeList(this)
		} else {
			new DefaultVisitor().visitParameterTypeList(this)
		}
	}
}

export class ParameterVariadicTypeList implements ParameterTypeList {
	arg1 : ParameterList
	constructor(arg1 : ParameterList) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitParameterVariadicTypeList(this)
		} else {
			new DefaultVisitor().visitParameterVariadicTypeList(this)
		}
	}
}

export class SinglePointer implements Pointer {
	arg1 : TypeQualifiers
	constructor(arg1 : TypeQualifiers) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitSinglePointer(this)
		} else {
			new DefaultVisitor().visitSinglePointer(this)
		}
	}
}

export class Pointers implements Pointer {
	arg1 : TypeQualifiers
	arg2 : Pointer
	constructor(arg1 : TypeQualifiers, arg2 : Pointer) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPointers(this)
		} else {
			new DefaultVisitor().visitPointers(this)
		}
	}
}

export class PostfixPrimaryExpression implements PostfixExpression {
	arg1 : PrimaryExpression
	constructor(arg1 : PrimaryExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPostfixPrimaryExpression(this)
		} else {
			new DefaultVisitor().visitPostfixPrimaryExpression(this)
		}
	}
}

export class PostfixExpressions implements PostfixExpression {
	arg1 : PostfixExpression
	arg2 : Expression
	constructor(arg1 : PostfixExpression, arg2 : Expression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPostfixExpressions(this)
		} else {
			new DefaultVisitor().visitPostfixExpressions(this)
		}
	}
}

export class PostfixAssignmentExpressions implements PostfixExpression {
	arg1 : PostfixExpression
	arg2 : AssignmentExpressions
	constructor(arg1 : PostfixExpression, arg2 : AssignmentExpressions) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPostfixAssignmentExpressions(this)
		} else {
			new DefaultVisitor().visitPostfixAssignmentExpressions(this)
		}
	}
}

export class PostfixDotExpressions implements PostfixExpression {
	arg1 : PostfixExpression
	arg2 : Identifier
	constructor(arg1 : PostfixExpression, arg2 : Identifier) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPostfixDotExpressions(this)
		} else {
			new DefaultVisitor().visitPostfixDotExpressions(this)
		}
	}
}

export class PostfixArrowExpressions implements PostfixExpression {
	arg1 : PostfixExpression
	arg2 : Identifier
	constructor(arg1 : PostfixExpression, arg2 : Identifier) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPostfixArrowExpressions(this)
		} else {
			new DefaultVisitor().visitPostfixArrowExpressions(this)
		}
	}
}

export class PostfixPlusExpressions implements PostfixExpression {
	arg1 : PostfixExpression
	constructor(arg1 : PostfixExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPostfixPlusExpressions(this)
		} else {
			new DefaultVisitor().visitPostfixPlusExpressions(this)
		}
	}
}

export class PostfixMinusExpressions implements PostfixExpression {
	arg1 : PostfixExpression
	constructor(arg1 : PostfixExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPostfixMinusExpressions(this)
		} else {
			new DefaultVisitor().visitPostfixMinusExpressions(this)
		}
	}
}

export class PrimaryIdentifierExpression implements PrimaryExpression {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPrimaryIdentifierExpression(this)
		} else {
			new DefaultVisitor().visitPrimaryIdentifierExpression(this)
		}
	}
}

export class PrimaryConstantExpression implements PrimaryExpression {
	arg1 : Constant
	constructor(arg1 : Constant) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPrimaryConstantExpression(this)
		} else {
			new DefaultVisitor().visitPrimaryConstantExpression(this)
		}
	}
}

export class PrimaryExpression implements PrimaryExpression {
	arg1 : Expression
	constructor(arg1 : Expression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitPrimaryExpression(this)
		} else {
			new DefaultVisitor().visitPrimaryExpression(this)
		}
	}
}

export class RelationalShiftExpression implements RelationalExpression {
	arg1 : ShiftExpression
	constructor(arg1 : ShiftExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitRelationalShiftExpression(this)
		} else {
			new DefaultVisitor().visitRelationalShiftExpression(this)
		}
	}
}

export class RelationalLeftShiftExpression implements RelationalExpression {
	arg1 : RelationalExpression
	arg2 : ShiftExpression
	constructor(arg1 : RelationalExpression, arg2 : ShiftExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitRelationalLeftShiftExpression(this)
		} else {
			new DefaultVisitor().visitRelationalLeftShiftExpression(this)
		}
	}
}

export class RelationalRightShiftExpression implements RelationalExpression {
	arg1 : RelationalExpression
	arg2 : ShiftExpression
	constructor(arg1 : RelationalExpression, arg2 : ShiftExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitRelationalRightShiftExpression(this)
		} else {
			new DefaultVisitor().visitRelationalRightShiftExpression(this)
		}
	}
}

export class RelationalLeftEqualShiftExpression implements RelationalExpression {
	arg1 : RelationalExpression
	arg2 : ShiftExpression
	constructor(arg1 : RelationalExpression, arg2 : ShiftExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitRelationalLeftEqualShiftExpression(this)
		} else {
			new DefaultVisitor().visitRelationalLeftEqualShiftExpression(this)
		}
	}
}

export class RelationalRightEqualShiftExpression implements RelationalExpression {
	arg1 : RelationalExpression
	arg2 : ShiftExpression
	constructor(arg1 : RelationalExpression, arg2 : ShiftExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitRelationalRightEqualShiftExpression(this)
		} else {
			new DefaultVisitor().visitRelationalRightEqualShiftExpression(this)
		}
	}
}

export class IfStatement implements SelectionStatement {
	arg1 : Expression
	arg2 : Statement
	constructor(arg1 : Expression, arg2 : Statement) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitIfStatement(this)
		} else {
			new DefaultVisitor().visitIfStatement(this)
		}
	}
}

export class IfElseStatement implements SelectionStatement {
	arg1 : Expression
	arg2 : Statement
	arg3 : Statement
	constructor(arg1 : Expression, arg2 : Statement, arg3 : Statement) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitIfElseStatement(this)
		} else {
			new DefaultVisitor().visitIfElseStatement(this)
		}
	}
}

export class SwitchStatement implements SelectionStatement {
	arg1 : Expression
	arg2 : Statement
	constructor(arg1 : Expression, arg2 : Statement) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitSwitchStatement(this)
		} else {
			new DefaultVisitor().visitSwitchStatement(this)
		}
	}
}

export class AdditiveShiftExpression implements ShiftExpression {
	arg1 : AdditiveExpression
	constructor(arg1 : AdditiveExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitAdditiveShiftExpression(this)
		} else {
			new DefaultVisitor().visitAdditiveShiftExpression(this)
		}
	}
}

export class LeftShiftExpression implements ShiftExpression {
	arg1 : ShiftExpression
	arg2 : AdditiveExpression
	constructor(arg1 : ShiftExpression, arg2 : AdditiveExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitLeftShiftExpression(this)
		} else {
			new DefaultVisitor().visitLeftShiftExpression(this)
		}
	}
}

export class RightShiftExpression implements ShiftExpression {
	arg1 : ShiftExpression
	arg2 : AdditiveExpression
	constructor(arg1 : ShiftExpression, arg2 : AdditiveExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitRightShiftExpression(this)
		} else {
			new DefaultVisitor().visitRightShiftExpression(this)
		}
	}
}

export class TypeSpecifier implements SpecifierQualifier {
	arg1 : TypeSpecifier
	constructor(arg1 : TypeSpecifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitTypeSpecifier(this)
		}
	}
}

export class TypeQualifier implements SpecifierQualifier {
	arg1 : TypeQualifier
	constructor(arg1 : TypeQualifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTypeQualifier(this)
		} else {
			new DefaultVisitor().visitTypeQualifier(this)
		}
	}
}

export class SpecifierQualifiers implements SpecifierQualifiers {
	arg1 : SpecifierQualifier
	arg2 : SpecifierQualifiers
	constructor(arg1 : SpecifierQualifier, arg2 : SpecifierQualifiers) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitSpecifierQualifiers(this)
		} else {
			new DefaultVisitor().visitSpecifierQualifiers(this)
		}
	}
}

export class StatementLabeledStatement implements Statement {
	arg1 : LabeledStatement
	constructor(arg1 : LabeledStatement) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStatementLabeledStatement(this)
		} else {
			new DefaultVisitor().visitStatementLabeledStatement(this)
		}
	}
}

export class StatementExpressionStatement implements Statement {
	arg1 : ExpressionStatement
	constructor(arg1 : ExpressionStatement) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStatementExpressionStatement(this)
		} else {
			new DefaultVisitor().visitStatementExpressionStatement(this)
		}
	}
}

export class StatementCompoundStatement implements Statement {
	arg1 : CompoundStatement
	constructor(arg1 : CompoundStatement) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStatementCompoundStatement(this)
		} else {
			new DefaultVisitor().visitStatementCompoundStatement(this)
		}
	}
}

export class StatementSelectionStatement implements Statement {
	arg1 : SelectionStatement
	constructor(arg1 : SelectionStatement) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStatementSelectionStatement(this)
		} else {
			new DefaultVisitor().visitStatementSelectionStatement(this)
		}
	}
}

export class StatementIterationStatement implements Statement {
	arg1 : IterationStatement
	constructor(arg1 : IterationStatement) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStatementIterationStatement(this)
		} else {
			new DefaultVisitor().visitStatementIterationStatement(this)
		}
	}
}

export class StatementJumpStatement implements Statement {
	arg1 : JumpStatement
	constructor(arg1 : JumpStatement) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStatementJumpStatement(this)
		} else {
			new DefaultVisitor().visitStatementJumpStatement(this)
		}
	}
}

export class Statements implements Statements {
	arg1 : Statement
	arg2 : Statements
	constructor(arg1 : Statement, arg2 : Statements) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStatements(this)
		} else {
			new DefaultVisitor().visitStatements(this)
		}
	}
}

export class EpsilonStatements implements Statements {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonStatements(this)
		} else {
			new DefaultVisitor().visitEpsilonStatements(this)
		}
	}
}

export class AutoClassSpecifier implements StorageClassSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitAutoClassSpecifier(this)
		} else {
			new DefaultVisitor().visitAutoClassSpecifier(this)
		}
	}
}

export class RegisterClassSpecifier implements StorageClassSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitRegisterClassSpecifier(this)
		} else {
			new DefaultVisitor().visitRegisterClassSpecifier(this)
		}
	}
}

export class StaticClassSpecifier implements StorageClassSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitStaticClassSpecifier(this)
		} else {
			new DefaultVisitor().visitStaticClassSpecifier(this)
		}
	}
}

export class ExternClassSpecifier implements StorageClassSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitExternClassSpecifier(this)
		} else {
			new DefaultVisitor().visitExternClassSpecifier(this)
		}
	}
}

export class TypedefClassSpecifier implements StorageClassSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitTypedefClassSpecifier(this)
		} else {
			new DefaultVisitor().visitTypedefClassSpecifier(this)
		}
	}
}

export class StructDeclaration implements StructDeclaration {
	arg1 : SpecifierQualifiers
	arg2 : StructDeclaratorList
	constructor(arg1 : SpecifierQualifiers, arg2 : StructDeclaratorList) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructDeclaration(this)
		} else {
			new DefaultVisitor().visitStructDeclaration(this)
		}
	}
}

export class StructDeclarations implements StructDeclarations {
	arg1 : StructDeclaration
	arg2 : StructDeclarations
	constructor(arg1 : StructDeclaration, arg2 : StructDeclarations) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructDeclarations(this)
		} else {
			new DefaultVisitor().visitStructDeclarations(this)
		}
	}
}

export class StructDeclarator implements StructDeclarator {
	arg1 : Declarator
	constructor(arg1 : Declarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructDeclarator(this)
		} else {
			new DefaultVisitor().visitStructDeclarator(this)
		}
	}
}

export class StructDeclaratorWithExpression implements StructDeclarator {
	arg1 : Declarator
	arg2 : ConstantExpression
	constructor(arg1 : Declarator, arg2 : ConstantExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructDeclaratorWithExpression(this)
		} else {
			new DefaultVisitor().visitStructDeclaratorWithExpression(this)
		}
	}
}

export class ConstantExpression implements StructDeclarator {
	arg1 : ConstantExpression
	constructor(arg1 : ConstantExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitConstantExpression(this)
		} else {
			new DefaultVisitor().visitConstantExpression(this)
		}
	}
}

export class StructDeclaratorList implements StructDeclaratorList {
	arg1 : StructDeclarator
	constructor(arg1 : StructDeclarator) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructDeclaratorList(this)
		} else {
			new DefaultVisitor().visitStructDeclaratorList(this)
		}
	}
}

export class StructDeclaratorLists implements StructDeclaratorList {
	arg1 : StructDeclaratorList
	arg2 : StructDeclarator
	constructor(arg1 : StructDeclaratorList, arg2 : StructDeclarator) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructDeclaratorLists(this)
		} else {
			new DefaultVisitor().visitStructDeclaratorLists(this)
		}
	}
}

export class Struct implements StructOrUnion {
	accept(v? : Visitor) {
		if (v) {
			v.visitStruct(this)
		} else {
			new DefaultVisitor().visitStruct(this)
		}
	}
}

export class Union implements StructOrUnion {
	accept(v? : Visitor) {
		if (v) {
			v.visitUnion(this)
		} else {
			new DefaultVisitor().visitUnion(this)
		}
	}
}

export class StructOrUnionDeclarationsWithIdentifier implements StructOrUnionSpecifier {
	arg1 : StructOrUnion
	arg2 : Identifier
	arg3 : StructDeclarations
	constructor(arg1 : StructOrUnion, arg2 : Identifier, arg3 : StructDeclarations) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructOrUnionDeclarationsWithIdentifier(this)
		} else {
			new DefaultVisitor().visitStructOrUnionDeclarationsWithIdentifier(this)
		}
	}
}

export class StructOrUnionDeclarations implements StructOrUnionSpecifier {
	arg1 : StructOrUnion
	arg2 : StructDeclarations
	constructor(arg1 : StructOrUnion, arg2 : StructDeclarations) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructOrUnionDeclarations(this)
		} else {
			new DefaultVisitor().visitStructOrUnionDeclarations(this)
		}
	}
}

export class StructOrUnionIdentifier implements StructOrUnionSpecifier {
	arg1 : StructOrUnion
	arg2 : Identifier
	constructor(arg1 : StructOrUnion, arg2 : Identifier) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructOrUnionIdentifier(this)
		} else {
			new DefaultVisitor().visitStructOrUnionIdentifier(this)
		}
	}
}

export class TypeName implements TypeName {
	arg1 : SpecifierQualifier
	arg2 : SpecifierQualifiers
	constructor(arg1 : SpecifierQualifier, arg2 : SpecifierQualifiers) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTypeName(this)
		} else {
			new DefaultVisitor().visitTypeName(this)
		}
	}
}

export class TypeNameWithAbstractDeclarator implements TypeName {
	arg1 : SpecifierQualifier
	arg2 : SpecifierQualifiers
	arg3 : AbstractDeclarator
	constructor(arg1 : SpecifierQualifier, arg2 : SpecifierQualifiers, arg3 : AbstractDeclarator) {
		this.arg1 = arg1
		this.arg2 = arg2
		this.arg3 = arg3
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTypeNameWithAbstractDeclarator(this)
		} else {
			new DefaultVisitor().visitTypeNameWithAbstractDeclarator(this)
		}
	}
}

export class ConstTypeQualifier implements TypeQualifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitConstTypeQualifier(this)
		} else {
			new DefaultVisitor().visitConstTypeQualifier(this)
		}
	}
}

export class VolatileTypeQualifier implements TypeQualifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitVolatileTypeQualifier(this)
		} else {
			new DefaultVisitor().visitVolatileTypeQualifier(this)
		}
	}
}

export class TypeQualifiers implements TypeQualifiers {
	arg1 : TypeQualifier
	arg2 : TypeQualifiers
	constructor(arg1 : TypeQualifier, arg2 : TypeQualifiers) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTypeQualifiers(this)
		} else {
			new DefaultVisitor().visitTypeQualifiers(this)
		}
	}
}

export class EpsilonTypeQualifiers implements TypeQualifiers {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonTypeQualifiers(this)
		} else {
			new DefaultVisitor().visitEpsilonTypeQualifiers(this)
		}
	}
}

export class VoidTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitVoidTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitVoidTypeSpecifier(this)
		}
	}
}

export class CharTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitCharTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitCharTypeSpecifier(this)
		}
	}
}

export class ShortTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitShortTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitShortTypeSpecifier(this)
		}
	}
}

export class IntTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitIntTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitIntTypeSpecifier(this)
		}
	}
}

export class LongTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitLongTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitLongTypeSpecifier(this)
		}
	}
}

export class FloatTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitFloatTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitFloatTypeSpecifier(this)
		}
	}
}

export class DoubleTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitDoubleTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitDoubleTypeSpecifier(this)
		}
	}
}

export class SignedTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitSignedTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitSignedTypeSpecifier(this)
		}
	}
}

export class UnsignedTypeSpecifier implements TypeSpecifier {
	accept(v? : Visitor) {
		if (v) {
			v.visitUnsignedTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitUnsignedTypeSpecifier(this)
		}
	}
}

export class StructOrUnionTypeSpecifier implements TypeSpecifier {
	arg1 : StructOrUnionSpecifier
	constructor(arg1 : StructOrUnionSpecifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitStructOrUnionTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitStructOrUnionTypeSpecifier(this)
		}
	}
}

export class EnumTypeSpecifier implements TypeSpecifier {
	arg1 : EnumSpecifier
	constructor(arg1 : EnumSpecifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEnumTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitEnumTypeSpecifier(this)
		}
	}
}

export class NamedTypeSpecifier implements TypeSpecifier {
	arg1 : TypedefName
	constructor(arg1 : TypedefName) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitNamedTypeSpecifier(this)
		} else {
			new DefaultVisitor().visitNamedTypeSpecifier(this)
		}
	}
}

export class TypedefName implements TypedefName {
	arg1 : Identifier
	constructor(arg1 : Identifier) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitTypedefName(this)
		} else {
			new DefaultVisitor().visitTypedefName(this)
		}
	}
}

export class UnaryPostfixExpression implements UnaryExpression {
	arg1 : PostfixExpression
	constructor(arg1 : PostfixExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryPostfixExpression(this)
		} else {
			new DefaultVisitor().visitUnaryPostfixExpression(this)
		}
	}
}

export class UnaryPlusExpression implements UnaryExpression {
	arg1 : UnaryExpression
	constructor(arg1 : UnaryExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryPlusExpression(this)
		} else {
			new DefaultVisitor().visitUnaryPlusExpression(this)
		}
	}
}

export class UnaryMinusExpression implements UnaryExpression {
	arg1 : UnaryExpression
	constructor(arg1 : UnaryExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryMinusExpression(this)
		} else {
			new DefaultVisitor().visitUnaryMinusExpression(this)
		}
	}
}

export class UnaryOperatorCastExpression implements UnaryExpression {
	arg1 : UnaryOperator
	arg2 : CastExpression
	constructor(arg1 : UnaryOperator, arg2 : CastExpression) {
		this.arg1 = arg1
		this.arg2 = arg2
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryOperatorCastExpression(this)
		} else {
			new DefaultVisitor().visitUnaryOperatorCastExpression(this)
		}
	}
}

export class UnarySizeofExpression implements UnaryExpression {
	arg1 : UnaryExpression
	constructor(arg1 : UnaryExpression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitUnarySizeofExpression(this)
		} else {
			new DefaultVisitor().visitUnarySizeofExpression(this)
		}
	}
}

export class UnarySizeofTypeNameExpression implements UnaryExpression {
	arg1 : TypeName
	constructor(arg1 : TypeName) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitUnarySizeofTypeNameExpression(this)
		} else {
			new DefaultVisitor().visitUnarySizeofTypeNameExpression(this)
		}
	}
}

export class UnaryAndOperator implements UnaryOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryAndOperator(this)
		} else {
			new DefaultVisitor().visitUnaryAndOperator(this)
		}
	}
}

export class UnaryMultiOperator implements UnaryOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryMultiOperator(this)
		} else {
			new DefaultVisitor().visitUnaryMultiOperator(this)
		}
	}
}

export class UnaryPlusOperator implements UnaryOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryPlusOperator(this)
		} else {
			new DefaultVisitor().visitUnaryPlusOperator(this)
		}
	}
}

export class UnaryMinusOperator implements UnaryOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryMinusOperator(this)
		} else {
			new DefaultVisitor().visitUnaryMinusOperator(this)
		}
	}
}

export class UnaryComplementOperator implements UnaryOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryComplementOperator(this)
		} else {
			new DefaultVisitor().visitUnaryComplementOperator(this)
		}
	}
}

export class UnaryNotOperator implements UnaryOperator {
	accept(v? : Visitor) {
		if (v) {
			v.visitUnaryNotOperator(this)
		} else {
			new DefaultVisitor().visitUnaryNotOperator(this)
		}
	}
}

export class UpdateExpression implements UpdateExpression {
	arg1 : Expression
	constructor(arg1 : Expression) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitUpdateExpression(this)
		} else {
			new DefaultVisitor().visitUpdateExpression(this)
		}
	}
}

export class EpsilonUpdateExpression implements UpdateExpression {
	arg1 : Eps
	constructor(arg1 : Eps) {
		this.arg1 = arg1
	}
	accept(v? : Visitor) {
		if (v) {
			v.visitEpsilonUpdateExpression(this)
		} else {
			new DefaultVisitor().visitEpsilonUpdateExpression(this)
		}
	}
}



interface Visitor {
	visitTranslationUnit(host : TranslationUnit): void
	visitAbstractPointerDeclarator(host : AbstractPointerDeclarator): void
	visitAbstractPointerDirectDeclarator(host : AbstractPointerDirectDeclarator): void
	visitAbstractDirectDeclarator(host : AbstractDirectDeclarator): void
	visitMultiplicativeAdditiveExpression(host : MultiplicativeAdditiveExpression): void
	visitAdditivePlusExpression(host : AdditivePlusExpression): void
	visitAdditiveMinusExpression(host : AdditiveMinusExpression): void
	visitEqualityAndExpression(host : EqualityAndExpression): void
	visitEqualityAndExpressions(host : EqualityAndExpressions): void
	visitConditionalAssignmentExpression(host : ConditionalAssignmentExpression): void
	visitAssignmentExpressions(host : AssignmentExpressions): void
	visitAssignmentExpressions(host : AssignmentExpressions): void
	visitAssignmentExpressions(host : AssignmentExpressions): void
	visitAssignmentEqualOperator(host : AssignmentEqualOperator): void
	visitAssignmentMultiEqualOperator(host : AssignmentMultiEqualOperator): void
	visitAssignmentDivEqualOperator(host : AssignmentDivEqualOperator): void
	visitAssignmentPercentEqualOperator(host : AssignmentPercentEqualOperator): void
	visitAssignmentPlusEqualOperator(host : AssignmentPlusEqualOperator): void
	visitAssignmentMinuxEqualOperator(host : AssignmentMinuxEqualOperator): void
	visitAssignmentLeftShiftOperator(host : AssignmentLeftShiftOperator): void
	visitAssignmentRightShiftOperator(host : AssignmentRightShiftOperator): void
	visitAssignmentAndEqualOperator(host : AssignmentAndEqualOperator): void
	visitAssignmentXorEqualOperator(host : AssignmentXorEqualOperator): void
	visitAssignmentOrEqualOperator(host : AssignmentOrEqualOperator): void
	visitCastExpression(host : CastExpression): void
	visitCastExpressions(host : CastExpressions): void
	visitCompoundStatement(host : CompoundStatement): void
	visitConditionExpression(host : ConditionExpression): void
	visitEpsilonConditionExpression(host : EpsilonConditionExpression): void
	visitConditionalLogicalOrExpression(host : ConditionalLogicalOrExpression): void
	visitConditionalLogicalOrExpressions(host : ConditionalLogicalOrExpressions): void
	visitConstantInteger(host : ConstantInteger): void
	visitConstantString(host : ConstantString): void
	visitConstantFloat(host : ConstantFloat): void
	visitConstantEnum(host : ConstantEnum): void
	visitConditionalConstantExpression(host : ConditionalConstantExpression): void
	visitDeclExpression(host : DeclExpression): void
	visitEpsilonDeclExpression(host : EpsilonDeclExpression): void
	visitDeclaration(host : Declaration): void
	visitStorageDeclarationSpecifier(host : StorageDeclarationSpecifier): void
	visitTypeDeclarationSpecifier(host : TypeDeclarationSpecifier): void
	visitTypeQualifierDeclarationSpecifier(host : TypeQualifierDeclarationSpecifier): void
	visitDeclarationSpecifiers(host : DeclarationSpecifiers): void
	visitEpsilonDeclarationSpecifiers(host : EpsilonDeclarationSpecifiers): void
	visitDeclarations(host : Declarations): void
	visitEpsilonDeclarations(host : EpsilonDeclarations): void
	visitPointerDeclarator(host : PointerDeclarator): void
	visitDirectDeclarator(host : DirectDeclarator): void
	visitDirectAbstractDeclarator(host : DirectAbstractDeclarator): void
	visitDirectConstantAbstractDeclarator(host : DirectConstantAbstractDeclarator): void
	visitDirectConstantAbstractDeclarators(host : DirectConstantAbstractDeclarators): void
	visitDirectIndexAbstractDeclarator(host : DirectIndexAbstractDeclarator): void
	visitDirectNoIndexAbstractDeclarator(host : DirectNoIndexAbstractDeclarator): void
	visitDirectParameterTypeListAbstractDeclarator(host : DirectParameterTypeListAbstractDeclarator): void
	visitDirectParameterTypeListAbstractDeclarators(host : DirectParameterTypeListAbstractDeclarators): void
	visitDirectParamAbstractDeclarator(host : DirectParamAbstractDeclarator): void
	visitDirectNoParamAbstractDeclarator(host : DirectNoParamAbstractDeclarator): void
	visitIdentifierDirectDeclarator(host : IdentifierDirectDeclarator): void
	visitDeclaratorDirectDeclarator(host : DeclaratorDirectDeclarator): void
	visitSquareConstantDirectDeclarator(host : SquareConstantDirectDeclarator): void
	visitSquareDirectDeclarator(host : SquareDirectDeclarator): void
	visitCurlyParameterDirectDeclarator(host : CurlyParameterDirectDeclarator): void
	visitCurlyDirectDeclarator(host : CurlyDirectDeclarator): void
	visitEnumIdentifierListSpecifier(host : EnumIdentifierListSpecifier): void
	visitEnumListSpecifier(host : EnumListSpecifier): void
	visitEnumIdentifierSpecifier(host : EnumIdentifierSpecifier): void
	visitEnumeratorIdentifier(host : EnumeratorIdentifier): void
	visitEnumeratorList(host : EnumeratorList): void
	visitEnumeratorLists(host : EnumeratorLists): void
	visitRelationalEqualityExpression(host : RelationalEqualityExpression): void
	visitEqualityExpression(host : EqualityExpression): void
	visitNotEqualityExpression(host : NotEqualityExpression): void
	visitExclusiveOrAndExpression(host : ExclusiveOrAndExpression): void
	visitExclusiveOrAndExpressions(host : ExclusiveOrAndExpressions): void
	visitExpressionAssignmentExpression(host : ExpressionAssignmentExpression): void
	visitExpressionAssignmentExpressions(host : ExpressionAssignmentExpressions): void
	visitExpressionStatement(host : ExpressionStatement): void
	visitEpsilonExpressionStatement(host : EpsilonExpressionStatement): void
	visitFunctionExternalDeclaration(host : FunctionExternalDeclaration): void
	visitExternalDeclaration(host : ExternalDeclaration): void
	visitExternalDeclarations(host : ExternalDeclarations): void
	visitEpsilonExternalDeclarations(host : EpsilonExternalDeclarations): void
	visitFunctionDefinition(host : FunctionDefinition): void
	visitIdentifier(host : Identifier): void
	visitIdentifiers(host : Identifiers): void
	visitEpsilonIdentifiers(host : EpsilonIdentifiers): void
	visitInclusiveOrExclusiveOrExpression(host : InclusiveOrExclusiveOrExpression): void
	visitInclusiveOrExclusiveOrExpression(host : InclusiveOrExclusiveOrExpression): void
	visitInitDeclarator(host : InitDeclarator): void
	visitInitInitializerDeclarator(host : InitInitializerDeclarator): void
	visitInitDeclarators(host : InitDeclarators): void
	visitEpsilonInitDeclarators(host : EpsilonInitDeclarators): void
	visitAssignmentInitializer(host : AssignmentInitializer): void
	visitInitializer(host : Initializer): void
	visitInitializerList(host : InitializerList): void
	visitInitializerLists(host : InitializerLists): void
	visitWhileStatement(host : WhileStatement): void
	visitDoWhileStatement(host : DoWhileStatement): void
	visitForStatement(host : ForStatement): void
	visitGotoStatement(host : GotoStatement): void
	visitContinueStatement(host : ContinueStatement): void
	visitBreakStatement(host : BreakStatement): void
	visitReturnStatement(host : ReturnStatement): void
	visitLabeledStatement(host : LabeledStatement): void
	visitCaseStatement(host : CaseStatement): void
	visitDefaultStatement(host : DefaultStatement): void
	visitLogicalAndInclusiveOrExpression(host : LogicalAndInclusiveOrExpression): void
	visitLogicalAndAndInclusiveOrExpression(host : LogicalAndAndInclusiveOrExpression): void
	visitLogicalOrAndExpression(host : LogicalOrAndExpression): void
	visitLogicalOrOrAndExpression(host : LogicalOrOrAndExpression): void
	visitMultiplicativeCastExpression(host : MultiplicativeCastExpression): void
	visitMultiMultiplicativeExpression(host : MultiMultiplicativeExpression): void
	visitDivMultiplicativeExpression(host : DivMultiplicativeExpression): void
	visitPercentMultiplicativeExpression(host : PercentMultiplicativeExpression): void
	visitDeclaratorParameterDeclaration(host : DeclaratorParameterDeclaration): void
	visitAbstractParameterDeclaration(host : AbstractParameterDeclaration): void
	visitParameterDeclaration(host : ParameterDeclaration): void
	visitParameterList(host : ParameterList): void
	visitParameterLists(host : ParameterLists): void
	visitParameterTypeList(host : ParameterTypeList): void
	visitParameterVariadicTypeList(host : ParameterVariadicTypeList): void
	visitSinglePointer(host : SinglePointer): void
	visitPointers(host : Pointers): void
	visitPostfixPrimaryExpression(host : PostfixPrimaryExpression): void
	visitPostfixExpressions(host : PostfixExpressions): void
	visitPostfixAssignmentExpressions(host : PostfixAssignmentExpressions): void
	visitPostfixDotExpressions(host : PostfixDotExpressions): void
	visitPostfixArrowExpressions(host : PostfixArrowExpressions): void
	visitPostfixPlusExpressions(host : PostfixPlusExpressions): void
	visitPostfixMinusExpressions(host : PostfixMinusExpressions): void
	visitPrimaryIdentifierExpression(host : PrimaryIdentifierExpression): void
	visitPrimaryConstantExpression(host : PrimaryConstantExpression): void
	visitPrimaryExpression(host : PrimaryExpression): void
	visitRelationalShiftExpression(host : RelationalShiftExpression): void
	visitRelationalLeftShiftExpression(host : RelationalLeftShiftExpression): void
	visitRelationalRightShiftExpression(host : RelationalRightShiftExpression): void
	visitRelationalLeftEqualShiftExpression(host : RelationalLeftEqualShiftExpression): void
	visitRelationalRightEqualShiftExpression(host : RelationalRightEqualShiftExpression): void
	visitIfStatement(host : IfStatement): void
	visitIfElseStatement(host : IfElseStatement): void
	visitSwitchStatement(host : SwitchStatement): void
	visitAdditiveShiftExpression(host : AdditiveShiftExpression): void
	visitLeftShiftExpression(host : LeftShiftExpression): void
	visitRightShiftExpression(host : RightShiftExpression): void
	visitTypeSpecifier(host : TypeSpecifier): void
	visitTypeQualifier(host : TypeQualifier): void
	visitSpecifierQualifiers(host : SpecifierQualifiers): void
	visitStatementLabeledStatement(host : StatementLabeledStatement): void
	visitStatementExpressionStatement(host : StatementExpressionStatement): void
	visitStatementCompoundStatement(host : StatementCompoundStatement): void
	visitStatementSelectionStatement(host : StatementSelectionStatement): void
	visitStatementIterationStatement(host : StatementIterationStatement): void
	visitStatementJumpStatement(host : StatementJumpStatement): void
	visitStatements(host : Statements): void
	visitEpsilonStatements(host : EpsilonStatements): void
	visitAutoClassSpecifier(host : AutoClassSpecifier): void
	visitRegisterClassSpecifier(host : RegisterClassSpecifier): void
	visitStaticClassSpecifier(host : StaticClassSpecifier): void
	visitExternClassSpecifier(host : ExternClassSpecifier): void
	visitTypedefClassSpecifier(host : TypedefClassSpecifier): void
	visitStructDeclaration(host : StructDeclaration): void
	visitStructDeclarations(host : StructDeclarations): void
	visitStructDeclarator(host : StructDeclarator): void
	visitStructDeclaratorWithExpression(host : StructDeclaratorWithExpression): void
	visitConstantExpression(host : ConstantExpression): void
	visitStructDeclaratorList(host : StructDeclaratorList): void
	visitStructDeclaratorLists(host : StructDeclaratorLists): void
	visitStruct(host : Struct): void
	visitUnion(host : Union): void
	visitStructOrUnionDeclarationsWithIdentifier(host : StructOrUnionDeclarationsWithIdentifier): void
	visitStructOrUnionDeclarations(host : StructOrUnionDeclarations): void
	visitStructOrUnionIdentifier(host : StructOrUnionIdentifier): void
	visitTypeName(host : TypeName): void
	visitTypeNameWithAbstractDeclarator(host : TypeNameWithAbstractDeclarator): void
	visitConstTypeQualifier(host : ConstTypeQualifier): void
	visitVolatileTypeQualifier(host : VolatileTypeQualifier): void
	visitTypeQualifiers(host : TypeQualifiers): void
	visitEpsilonTypeQualifiers(host : EpsilonTypeQualifiers): void
	visitVoidTypeSpecifier(host : VoidTypeSpecifier): void
	visitCharTypeSpecifier(host : CharTypeSpecifier): void
	visitShortTypeSpecifier(host : ShortTypeSpecifier): void
	visitIntTypeSpecifier(host : IntTypeSpecifier): void
	visitLongTypeSpecifier(host : LongTypeSpecifier): void
	visitFloatTypeSpecifier(host : FloatTypeSpecifier): void
	visitDoubleTypeSpecifier(host : DoubleTypeSpecifier): void
	visitSignedTypeSpecifier(host : SignedTypeSpecifier): void
	visitUnsignedTypeSpecifier(host : UnsignedTypeSpecifier): void
	visitStructOrUnionTypeSpecifier(host : StructOrUnionTypeSpecifier): void
	visitEnumTypeSpecifier(host : EnumTypeSpecifier): void
	visitNamedTypeSpecifier(host : NamedTypeSpecifier): void
	visitTypedefName(host : TypedefName): void
	visitUnaryPostfixExpression(host : UnaryPostfixExpression): void
	visitUnaryPlusExpression(host : UnaryPlusExpression): void
	visitUnaryMinusExpression(host : UnaryMinusExpression): void
	visitUnaryOperatorCastExpression(host : UnaryOperatorCastExpression): void
	visitUnarySizeofExpression(host : UnarySizeofExpression): void
	visitUnarySizeofTypeNameExpression(host : UnarySizeofTypeNameExpression): void
	visitUnaryAndOperator(host : UnaryAndOperator): void
	visitUnaryMultiOperator(host : UnaryMultiOperator): void
	visitUnaryPlusOperator(host : UnaryPlusOperator): void
	visitUnaryMinusOperator(host : UnaryMinusOperator): void
	visitUnaryComplementOperator(host : UnaryComplementOperator): void
	visitUnaryNotOperator(host : UnaryNotOperator): void
	visitUpdateExpression(host : UpdateExpression): void
	visitEpsilonUpdateExpression(host : EpsilonUpdateExpression): void
}

export class DefaultVisitor implements Visitor {
	visitTranslationUnit(host : TranslationUnit) {
		host.arg1.accept(this)
	}
	visitAbstractPointerDeclarator(host : AbstractPointerDeclarator) {
		host.arg1.accept(this)
	}
	visitAbstractPointerDirectDeclarator(host : AbstractPointerDirectDeclarator) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitAbstractDirectDeclarator(host : AbstractDirectDeclarator) {
		host.arg1.accept(this)
	}
	visitMultiplicativeAdditiveExpression(host : MultiplicativeAdditiveExpression) {
		host.arg1.accept(this)
	}
	visitAdditivePlusExpression(host : AdditivePlusExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("plus")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitAdditiveMinusExpression(host : AdditiveMinusExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("minus")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitEqualityAndExpression(host : EqualityAndExpression) {
		host.arg1.accept(this)
	}
	visitEqualityAndExpressions(host : EqualityAndExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitConditionalAssignmentExpression(host : ConditionalAssignmentExpression) {
		host.arg1.accept(this)
	}
	visitAssignmentExpressions(host : AssignmentExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
		process.stdout.write(" ")
		host.arg3.accept(this)
	}
	visitAssignmentExpressions(host : AssignmentExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitAssignmentExpressions(host : AssignmentExpressions) {
		host.arg1.accept(this)
	}
	visitAssignmentEqualOperator(host : AssignmentEqualOperator) {
		process.stdout.write("euaql")
	}
	visitAssignmentMultiEqualOperator(host : AssignmentMultiEqualOperator) {
		process.stdout.write("multiEqual")
	}
	visitAssignmentDivEqualOperator(host : AssignmentDivEqualOperator) {
		process.stdout.write("divEqual")
	}
	visitAssignmentPercentEqualOperator(host : AssignmentPercentEqualOperator) {
		process.stdout.write("percentEqual")
	}
	visitAssignmentPlusEqualOperator(host : AssignmentPlusEqualOperator) {
		process.stdout.write("plusEqual")
	}
	visitAssignmentMinuxEqualOperator(host : AssignmentMinuxEqualOperator) {
		process.stdout.write("minusEqual")
	}
	visitAssignmentLeftShiftOperator(host : AssignmentLeftShiftOperator) {
		process.stdout.write("leftShiftEqual")
	}
	visitAssignmentRightShiftOperator(host : AssignmentRightShiftOperator) {
		process.stdout.write("rifhtShiftEqual")
	}
	visitAssignmentAndEqualOperator(host : AssignmentAndEqualOperator) {
		process.stdout.write("andEqual")
	}
	visitAssignmentXorEqualOperator(host : AssignmentXorEqualOperator) {
		process.stdout.write("xorEqual")
	}
	visitAssignmentOrEqualOperator(host : AssignmentOrEqualOperator) {
		process.stdout.write("orEqual")
	}
	visitCastExpression(host : CastExpression) {
		host.arg1.accept(this)
	}
	visitCastExpressions(host : CastExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitCompoundStatement(host : CompoundStatement) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitConditionExpression(host : ConditionExpression) {
		host.arg1.accept(this)
	}
	visitEpsilonConditionExpression(host : EpsilonConditionExpression) {
		host.arg1.accept(this)
	}
	visitConditionalLogicalOrExpression(host : ConditionalLogicalOrExpression) {
		host.arg1.accept(this)
	}
	visitConditionalLogicalOrExpressions(host : ConditionalLogicalOrExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
		process.stdout.write(" ")
		host.arg3.accept(this)
	}
	visitConstantInteger(host : ConstantInteger) {
		process.stdout.write(""+host.arg1)
	}
	visitConstantString(host : ConstantString) {
		process.stdout.write(""+host.arg1)
	}
	visitConstantFloat(host : ConstantFloat) {
		process.stdout.write(""+host.arg1)
	}
	visitConstantEnum(host : ConstantEnum) {
		host.arg1.accept(this)
	}
	visitConditionalConstantExpression(host : ConditionalConstantExpression) {
		host.arg1.accept(this)
	}
	visitDeclExpression(host : DeclExpression) {
		host.arg1.accept(this)
	}
	visitEpsilonDeclExpression(host : EpsilonDeclExpression) {
		host.arg1.accept(this)
	}
	visitDeclaration(host : Declaration) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
		process.stdout.write(" ")
		host.arg3.accept(this)
	}
	visitStorageDeclarationSpecifier(host : StorageDeclarationSpecifier) {
		host.arg1.accept(this)
	}
	visitTypeDeclarationSpecifier(host : TypeDeclarationSpecifier) {
		host.arg1.accept(this)
	}
	visitTypeQualifierDeclarationSpecifier(host : TypeQualifierDeclarationSpecifier) {
		host.arg1.accept(this)
	}
	visitDeclarationSpecifiers(host : DeclarationSpecifiers) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitEpsilonDeclarationSpecifiers(host : EpsilonDeclarationSpecifiers) {
		host.arg1.accept(this)
	}
	visitDeclarations(host : Declarations) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitEpsilonDeclarations(host : EpsilonDeclarations) {
		host.arg1.accept(this)
	}
	visitPointerDeclarator(host : PointerDeclarator) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitDirectDeclarator(host : DirectDeclarator) {
		host.arg1.accept(this)
	}
	visitDirectAbstractDeclarator(host : DirectAbstractDeclarator) {
		host.arg1.accept(this)
	}
	visitDirectConstantAbstractDeclarator(host : DirectConstantAbstractDeclarator) {
		host.arg1.accept(this)
	}
	visitDirectConstantAbstractDeclarators(host : DirectConstantAbstractDeclarators) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitDirectIndexAbstractDeclarator(host : DirectIndexAbstractDeclarator) {
		process.stdout.write("index")
	}
	visitDirectNoIndexAbstractDeclarator(host : DirectNoIndexAbstractDeclarator) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("noIndex")
	}
	visitDirectParameterTypeListAbstractDeclarator(host : DirectParameterTypeListAbstractDeclarator) {
		host.arg1.accept(this)
	}
	visitDirectParameterTypeListAbstractDeclarators(host : DirectParameterTypeListAbstractDeclarators) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitDirectParamAbstractDeclarator(host : DirectParamAbstractDeclarator) {
		process.stdout.write("param")
	}
	visitDirectNoParamAbstractDeclarator(host : DirectNoParamAbstractDeclarator) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("noParam")
	}
	visitIdentifierDirectDeclarator(host : IdentifierDirectDeclarator) {
		host.arg1.accept(this)
	}
	visitDeclaratorDirectDeclarator(host : DeclaratorDirectDeclarator) {
		host.arg1.accept(this)
	}
	visitSquareConstantDirectDeclarator(host : SquareConstantDirectDeclarator) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitSquareDirectDeclarator(host : SquareDirectDeclarator) {
		host.arg1.accept(this)
	}
	visitCurlyParameterDirectDeclarator(host : CurlyParameterDirectDeclarator) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitCurlyDirectDeclarator(host : CurlyDirectDeclarator) {
		host.arg1.accept(this)
	}
	visitEnumIdentifierListSpecifier(host : EnumIdentifierListSpecifier) {
		process.stdout.write("enum")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitEnumListSpecifier(host : EnumListSpecifier) {
		process.stdout.write("enum")
		process.stdout.write(" ")
		host.arg1.accept(this)
	}
	visitEnumIdentifierSpecifier(host : EnumIdentifierSpecifier) {
		process.stdout.write("enum")
		process.stdout.write(" ")
		host.arg1.accept(this)
	}
	visitEnumeratorIdentifier(host : EnumeratorIdentifier) {
		host.arg1.accept(this)
	}
	visitEnumeratorList(host : EnumeratorList) {
		host.arg1.accept(this)
	}
	visitEnumeratorLists(host : EnumeratorLists) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitRelationalEqualityExpression(host : RelationalEqualityExpression) {
		host.arg1.accept(this)
	}
	visitEqualityExpression(host : EqualityExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("equals")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitNotEqualityExpression(host : NotEqualityExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("notEquals")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitExclusiveOrAndExpression(host : ExclusiveOrAndExpression) {
		host.arg1.accept(this)
	}
	visitExclusiveOrAndExpressions(host : ExclusiveOrAndExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitExpressionAssignmentExpression(host : ExpressionAssignmentExpression) {
		host.arg1.accept(this)
	}
	visitExpressionAssignmentExpressions(host : ExpressionAssignmentExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitExpressionStatement(host : ExpressionStatement) {
		host.arg1.accept(this)
	}
	visitEpsilonExpressionStatement(host : EpsilonExpressionStatement) {
		host.arg1.accept(this)
	}
	visitFunctionExternalDeclaration(host : FunctionExternalDeclaration) {
		host.arg1.accept(this)
	}
	visitExternalDeclaration(host : ExternalDeclaration) {
		host.arg1.accept(this)
	}
	visitExternalDeclarations(host : ExternalDeclarations) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitEpsilonExternalDeclarations(host : EpsilonExternalDeclarations) {
		host.arg1.accept(this)
	}
	visitFunctionDefinition(host : FunctionDefinition) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
		process.stdout.write(" ")
		host.arg3.accept(this)
		process.stdout.write(" ")
		host.arg4.accept(this)
	}
	visitIdentifier(host : Identifier) {
		host.arg1.accept(this)
	}
	visitIdentifiers(host : Identifiers) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitEpsilonIdentifiers(host : EpsilonIdentifiers) {
		host.arg1.accept(this)
	}
	visitInclusiveOrExclusiveOrExpression(host : InclusiveOrExclusiveOrExpression) {
		host.arg1.accept(this)
	}
	visitInclusiveOrExclusiveOrExpression(host : InclusiveOrExclusiveOrExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitInitDeclarator(host : InitDeclarator) {
		host.arg1.accept(this)
	}
	visitInitInitializerDeclarator(host : InitInitializerDeclarator) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitInitDeclarators(host : InitDeclarators) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitEpsilonInitDeclarators(host : EpsilonInitDeclarators) {
		host.arg1.accept(this)
	}
	visitAssignmentInitializer(host : AssignmentInitializer) {
		host.arg1.accept(this)
	}
	visitInitializer(host : Initializer) {
		host.arg1.accept(this)
	}
	visitInitializerList(host : InitializerList) {
		host.arg1.accept(this)
	}
	visitInitializerLists(host : InitializerLists) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitWhileStatement(host : WhileStatement) {
		process.stdout.write("while")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitDoWhileStatement(host : DoWhileStatement) {
		process.stdout.write("do")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("while")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitForStatement(host : ForStatement) {
		process.stdout.write("for")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
		process.stdout.write(" ")
		host.arg3.accept(this)
		process.stdout.write(" ")
		host.arg4.accept(this)
	}
	visitGotoStatement(host : GotoStatement) {
		process.stdout.write("goto")
		process.stdout.write(" ")
		host.arg1.accept(this)
	}
	visitContinueStatement(host : ContinueStatement) {
		process.stdout.write("continue")
		process.stdout.write(" ")
		host.arg1.accept(this)
	}
	visitBreakStatement(host : BreakStatement) {
		process.stdout.write("break")
		process.stdout.write(" ")
		host.arg1.accept(this)
	}
	visitReturnStatement(host : ReturnStatement) {
		process.stdout.write("return")
		process.stdout.write(" ")
		host.arg1.accept(this)
	}
	visitLabeledStatement(host : LabeledStatement) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitCaseStatement(host : CaseStatement) {
		process.stdout.write("case")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitDefaultStatement(host : DefaultStatement) {
		process.stdout.write("default")
		process.stdout.write(" ")
		host.arg1.accept(this)
	}
	visitLogicalAndInclusiveOrExpression(host : LogicalAndInclusiveOrExpression) {
		host.arg1.accept(this)
	}
	visitLogicalAndAndInclusiveOrExpression(host : LogicalAndAndInclusiveOrExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitLogicalOrAndExpression(host : LogicalOrAndExpression) {
		host.arg1.accept(this)
	}
	visitLogicalOrOrAndExpression(host : LogicalOrOrAndExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitMultiplicativeCastExpression(host : MultiplicativeCastExpression) {
		host.arg1.accept(this)
	}
	visitMultiMultiplicativeExpression(host : MultiMultiplicativeExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("multi")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitDivMultiplicativeExpression(host : DivMultiplicativeExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("div")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitPercentMultiplicativeExpression(host : PercentMultiplicativeExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("percent")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitDeclaratorParameterDeclaration(host : DeclaratorParameterDeclaration) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
		process.stdout.write(" ")
		host.arg3.accept(this)
	}
	visitAbstractParameterDeclaration(host : AbstractParameterDeclaration) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
		process.stdout.write(" ")
		host.arg3.accept(this)
	}
	visitParameterDeclaration(host : ParameterDeclaration) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitParameterList(host : ParameterList) {
		host.arg1.accept(this)
	}
	visitParameterLists(host : ParameterLists) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitParameterTypeList(host : ParameterTypeList) {
		host.arg1.accept(this)
	}
	visitParameterVariadicTypeList(host : ParameterVariadicTypeList) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("variadic")
	}
	visitSinglePointer(host : SinglePointer) {
		process.stdout.write("asterisk")
		process.stdout.write(" ")
		host.arg1.accept(this)
	}
	visitPointers(host : Pointers) {
		process.stdout.write("asterisk")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitPostfixPrimaryExpression(host : PostfixPrimaryExpression) {
		host.arg1.accept(this)
	}
	visitPostfixExpressions(host : PostfixExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitPostfixAssignmentExpressions(host : PostfixAssignmentExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitPostfixDotExpressions(host : PostfixDotExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("dot")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitPostfixArrowExpressions(host : PostfixArrowExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("arrow")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitPostfixPlusExpressions(host : PostfixPlusExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("plusPlus")
	}
	visitPostfixMinusExpressions(host : PostfixMinusExpressions) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("minusMinus")
	}
	visitPrimaryIdentifierExpression(host : PrimaryIdentifierExpression) {
		host.arg1.accept(this)
	}
	visitPrimaryConstantExpression(host : PrimaryConstantExpression) {
		host.arg1.accept(this)
	}
	visitPrimaryExpression(host : PrimaryExpression) {
		host.arg1.accept(this)
	}
	visitRelationalShiftExpression(host : RelationalShiftExpression) {
		host.arg1.accept(this)
	}
	visitRelationalLeftShiftExpression(host : RelationalLeftShiftExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("leftShift")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitRelationalRightShiftExpression(host : RelationalRightShiftExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("rightShift")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitRelationalLeftEqualShiftExpression(host : RelationalLeftEqualShiftExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("leftEqualShift")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitRelationalRightEqualShiftExpression(host : RelationalRightEqualShiftExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("rightEqualShift")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitIfStatement(host : IfStatement) {
		process.stdout.write("if")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitIfElseStatement(host : IfElseStatement) {
		process.stdout.write("if")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
		process.stdout.write(" ")
		process.stdout.write("else")
		process.stdout.write(" ")
		host.arg3.accept(this)
	}
	visitSwitchStatement(host : SwitchStatement) {
		process.stdout.write("switch")
		process.stdout.write(" ")
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitAdditiveShiftExpression(host : AdditiveShiftExpression) {
		host.arg1.accept(this)
	}
	visitLeftShiftExpression(host : LeftShiftExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("leftShift")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitRightShiftExpression(host : RightShiftExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		process.stdout.write("rightShift")
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitTypeSpecifier(host : TypeSpecifier) {
		host.arg1.accept(this)
	}
	visitTypeQualifier(host : TypeQualifier) {
		host.arg1.accept(this)
	}
	visitSpecifierQualifiers(host : SpecifierQualifiers) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitStatementLabeledStatement(host : StatementLabeledStatement) {
		host.arg1.accept(this)
	}
	visitStatementExpressionStatement(host : StatementExpressionStatement) {
		host.arg1.accept(this)
	}
	visitStatementCompoundStatement(host : StatementCompoundStatement) {
		host.arg1.accept(this)
	}
	visitStatementSelectionStatement(host : StatementSelectionStatement) {
		host.arg1.accept(this)
	}
	visitStatementIterationStatement(host : StatementIterationStatement) {
		host.arg1.accept(this)
	}
	visitStatementJumpStatement(host : StatementJumpStatement) {
		host.arg1.accept(this)
	}
	visitStatements(host : Statements) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitEpsilonStatements(host : EpsilonStatements) {
		host.arg1.accept(this)
	}
	visitAutoClassSpecifier(host : AutoClassSpecifier) {
		process.stdout.write("auto")
	}
	visitRegisterClassSpecifier(host : RegisterClassSpecifier) {
		process.stdout.write("register")
	}
	visitStaticClassSpecifier(host : StaticClassSpecifier) {
		process.stdout.write("static")
	}
	visitExternClassSpecifier(host : ExternClassSpecifier) {
		process.stdout.write("extern")
	}
	visitTypedefClassSpecifier(host : TypedefClassSpecifier) {
		process.stdout.write("typedef")
	}
	visitStructDeclaration(host : StructDeclaration) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitStructDeclarations(host : StructDeclarations) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitStructDeclarator(host : StructDeclarator) {
		host.arg1.accept(this)
	}
	visitStructDeclaratorWithExpression(host : StructDeclaratorWithExpression) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitConstantExpression(host : ConstantExpression) {
		host.arg1.accept(this)
	}
	visitStructDeclaratorList(host : StructDeclaratorList) {
		host.arg1.accept(this)
	}
	visitStructDeclaratorLists(host : StructDeclaratorLists) {
		host.arg1.accept(this)
		process.stdout.write(" ")
		host.arg2.accept(this)
	}
	visitStruct(host : Struct) {
		process.stdout.write("struct")
	}
	visitUnion(host : Union) {
		process.stdout.write("union")
	}
	visitStructOrUnionDeclarationsWithIdentifier(host : StructOrUnionDeclarationsWithIdentifier) {
		host.arg1.accept(this)
		process.stdout.